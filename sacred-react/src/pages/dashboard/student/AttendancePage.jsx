import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../../../style/pages_css/dashboard/student_css/attendancePage.css";
import { Student_View_Attendance } from "../../../api_Data/student_api";
import { studentNavigationLink } from '../student/Links';
import Sidebar from "../../../components/Sidebar";
import BackButton from "../../../components/BackButton";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [remarksData, setRemarksData] = useState({}); // Store remarks data
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch attendance data when component loads
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await Student_View_Attendance(); // API call
        const data = response.data;

        // Convert the response into a format where the date is the key
        const attendanceMap = {};
        const remarksMap = {};

        data.forEach((attendance) => {
          const date = attendance.attendence_date;
          attendanceMap[date] = attendance.status;
          remarksMap[date] = attendance.remark || ""; // Add remarks if available
        });

        setAttendanceData(attendanceMap);
        setRemarksData(remarksMap); // Set remarks data
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    fetchAttendance();
  }, []);

  // Handle date selection
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to calculate the number of absences in the current month
  const getTotalAbsences = () => {
    let totalAbsences = 0;
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    Object.keys(attendanceData).forEach((dateString) => {
      const date = new Date(dateString);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        if (attendanceData[dateString] === false) {
          totalAbsences++;
        }
      }
    });

    return totalAbsences;
  };

  // Render a custom tile for each day showing the attendance status
  const tileContent = ({ date, view }) => {
    const dateString = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const status = attendanceData[dateString];

    if (view === "month") {
      // Check if the day is Saturday and mark it as a holiday
      const isSaturday = date.getDay() === 6;
      
      return (
        <div className="attendance-tile">
          {/* Show "Holiday" for Saturdays */}
          {isSaturday ? (
            <span className="holiday">Holiday</span>
          ) : (
            <span className={status !== undefined ? (status ? "present" : "absent") : "absent"}>
              {status !== undefined ? (status ? "P" : "A") : "A"}
            </span>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <BackButton />

      <div className="attendance-container">
        <h2>Student Attendance</h2>

        <div className="calendar-section">
          <h3>Select a Date to View Attendance</h3>
          {/* Calendar Component */}
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            tileContent={tileContent}
          />
        </div>

        <div className="attendance-summary">
          <h3>Attendance Details for {selectedDate.toDateString()}</h3>

          {/* Display attendance status with colors */}
          <div className="status-card">
            <h4>Status: {attendanceData[selectedDate.toISOString().split("T")[0]] !== undefined
              ? attendanceData[selectedDate.toISOString().split("T")[0]]
                ? <span className="present">Present</span>
                : <span className="absent">Absent</span>
              : <span className="absent">Absent</span>}
            </h4>

            {/* Display remarks */}
            <p>Remarks: {remarksData[selectedDate.toISOString().split("T")[0]]
              ? remarksData[selectedDate.toISOString().split("T")[0]]
              : "No remarks"}</p>
          </div>

          {/* Show total absences for the current month */}
          <div className="absences-summary">
            <h4>Total Absences this Month: {getTotalAbsences()}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendancePage;
