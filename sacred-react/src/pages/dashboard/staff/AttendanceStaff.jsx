import React, { useState, useEffect } from "react";
import "../../../style/pages_css/dashboard/staff_css/attendanceStaff.css";
import {
  Staff_Selected_Class_StudentName,
  Staff_TotalAttendance_Students, 
  Staff_Home,
} from "../../../api_Data/staff_api";
import BackButton from "../../../components/BackButton";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/**
 * AttendanceStaff Component
 * Displays and manages student attendance for staff members
 */
const AttendanceStaff = () => {
  // State Management
  const [classes, setClasses] = useState([]); // List of classes taught by staff
  const [selectedClass, setSelectedClass] = useState(null); // Currently selected class
  const [students, setStudents] = useState([]); // Students in selected class
  const [studentAttendance, setStudentAttendance] = useState({}); // Attendance records
  const todayDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  /**
   * Fetch classes taught by staff member on component mount
   */
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await Staff_Home();
        setClasses(response.user.teaches_classes);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };
    fetchClasses();
  }, []);

  /**
   * Fetch students and their attendance when a class is selected
   */
  useEffect(() => {
    if (selectedClass) {
      const fetchStudentsAndAttendance = async () => {
        try {
          // Get students in selected class
          const studentsResponse = await Staff_Selected_Class_StudentName(selectedClass);
          setStudents(studentsResponse.students_data);

          // Get attendance records and map them by student ID
          const attendanceResponse = await Staff_TotalAttendance_Students(selectedClass);
          const attendanceMap = {};

          attendanceResponse.students_attendance.forEach((attendance) => {
            if (attendance.attendance_date === todayDate) {
              attendanceMap[attendance.student.id] = attendance.status;
            }
          });

          setStudentAttendance(attendanceMap);
        } catch (error) {
          console.error("Error fetching students or attendance", error);
        }
      };
      fetchStudentsAndAttendance();
    }
  }, [selectedClass]);

  /**
   * Handle class selection from dropdown
   */
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <>
      <BackButton />
      <div className="attendance-container">
        <h2>Today's Student Attendance</h2>

        {/* Class Selection Dropdown */}
        <div className="class-selection">
          <label htmlFor="class-select">Select Class:</label>
          <select id="class-select" onChange={handleClassChange} value={selectedClass || ""}>
            <option value="">--Select a Class--</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Students List with Attendance Status */}
        {selectedClass && (
          <div className="students-list">
            <h3>Students in Class</h3>
            <b>Date: {todayDate}  </b>
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  <span>
                    Roll No: {student.roll_no}
                  </span>
                  <span>
                    {student.name.first_name} {student.name.last_name}
                  </span>
                  <span className="attendance-status">
                    {studentAttendance[student.id] !== undefined ? (
                      studentAttendance[student.id] ? (
                        <FaCheckCircle className="present" />
                      ) : (
                        <FaTimesCircle className="absent" />
                      )
                    ) : (
                      "No attendance data"
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceStaff;