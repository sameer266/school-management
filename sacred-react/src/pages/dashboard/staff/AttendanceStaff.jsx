import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import "../../../style/pages_css/dashboard/staff_css/attendanceStaff.css";
import { Student_View_Attendance } from "../../../api_Data/student_api";
import BackButton from "../../../components/BackButton";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaEdit } from "react-icons/fa"; // Icons for status and edit

const AttendanceStaff= () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [remarksData, setRemarksData] = useState({}); // Store remarks data
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [status, setStatus] = useState(null); // State for attendance status
  const [remarks, setRemarks] = useState(""); // State for remarks

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
    setIsEditing(false); // Reset edit mode when date changes
    const dateString = date.toISOString().split("T")[0];
    setStatus(attendanceData[dateString]); // Set status for the selected date
    setRemarks(remarksData[dateString] || ""); // Set remarks for the selected date
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  // Handle remarks change
  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  // Save updated attendance
  const handleSave = async () => {
    const dateString = selectedDate.toISOString().split("T")[0];
    try {
      // await Staff_Update_Attendance(dateString, status, remarks); // API call to update attendance
      setAttendanceData((prev) => ({ ...prev, [dateString]: status }));
      setRemarksData((prev) => ({ ...prev, [dateString]: remarks }));
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating attendance", error);
    }
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
              {/* Render P for present and A for absent */}
              <span className={status !== undefined ? (status ? "present-text" : "absent-text") : "absent-text"}>
                {status !== undefined ? (status ? "P" : "A") : "A"}
              </span>
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
            className="custom-calendar"
          />
        </div>

        <div className="attendance-summary">
          <h3>Attendance Details for {selectedDate.toDateString()}</h3>

          {/* Display attendance status with icons */}
          <div className="status-card">
            <h4>
              Status:{" "}
              {isEditing ? (
                <div className="edit-status">
                  <button
                    className={`status-button ${status === true ? "active" : ""}`}
                    onClick={() => handleStatusChange(true)}
                  >
                    <FaCheckCircle /> Present
                  </button>
                  <button
                    className={`status-button ${status === false ? "active" : ""}`}
                    onClick={() => handleStatusChange(false)}
                  >
                    <FaTimesCircle /> Absent
                  </button>
                </div>
              ) : (
                <span className={status !== undefined ? (status ? "present" : "absent") : "absent"}>
                  {status !== undefined ? (
                    status ? (
                      <>
                      <FaCheckCircle /> Present
                      </>
                    ) : (
                      <>
                      <FaTimesCircle /> Absent
                      </>
                    )
                  ) : (
                    <>
                    <FaTimesCircle /> Absent
                    </>
                  )}
                </span>
              )}
            </h4>

            {/* Display remarks */}
            <p className="remarks">
              <FaInfoCircle /> Remarks:{" "}
              {isEditing ? (
                <textarea
                  value={remarks}
                  onChange={handleRemarksChange}
                  placeholder="Enter remarks"
                />
              ) : (
                remarks || "No remarks"
              )}
            </p>

            {/* Edit and Save buttons */}
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit
              </button>
            )}
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

export default AttendanceStaff