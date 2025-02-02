
// components/TakeAttendance.js
import React, { useState,useEffect } from 'react';
import '../../../style/pages_css/dashboard/staff_css/takeattendance.css';
import { FaCheck, FaTimes, FaSearch, FaCalendarAlt } from 'react-icons/fa';

import { Staff_Take_Student_Attendence , Staff_Total_StudentsName} from '../../../api_Data/staff_api';
const TakeAttendance = () => {
  // Sample student data with roll numbers and remarks
  const [students, setStudents] = useState([
    { id: 1, rollNo: '101', name: 'John Doe', present: false, remarks: '' },
    { id: 2, rollNo: '102', name: 'Jane Smith', present: false, remarks: '' },
    { id: 3, rollNo: '103', name: 'Alice Johnson', present: false, remarks: '' },
    { id: 4, rollNo: '104', name: 'Bob Brown', present: false, remarks: '' },
  ]);
   
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(()=>{

    const fetchStudents= async ()=>{
        const response= await Staff_Total_StudentsName();
        console.log(response)
    }
    fetchStudents();
    

  },[])


  // Handle marking a student as present or absent
  const handleAttendance = (id, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, present: status, remarks: status ? '' : student.remarks } : student
      )
    );
  };

  // Handle remarks input
  const handleRemarks = (id, remarks) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, remarks } : student
      )
    );
  };

  // Handle submitting attendance
  const handleSubmit = () => {
    const attendanceData = students.map((student) => ({
      id: student.id,
      rollNo: student.rollNo,
      name: student.name,
      status: student.present ? 'Present' : 'Absent',
      remarks: student.remarks,
    }));
    console.log('Attendance Submitted:', attendanceData);
    alert('Attendance submitted successfully!');
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="take-attendance">
      <h1>Take Attendance</h1>
      <div className="attendance-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="date-picker">
          <FaCalendarAlt className="calendar-icon" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <div className="student-list">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-item">
            <div className="student-info">
              <span className="student-roll">{student.rollNo}</span>
              <span className="student-name">{student.name}</span>
            </div>
            <div className="attendance-buttons">
              <button
                className={`present ${student.present ? 'active' : ''}`}
                onClick={() => handleAttendance(student.id, true)}
              >
                {student.present ? <FaCheck /> : 'Present'}
              </button>
              <button
                className={`absent ${!student.present ? 'active' : ''}`}
                onClick={() => handleAttendance(student.id, false)}
              >
                {!student.present ? <FaTimes /> : 'Absent'}
              </button>
            </div>
            {!student.present && (
              <div className="remarks-section">
                <textarea
                  placeholder="Add remarks..."
                  value={student.remarks}
                  onChange={(e) => handleRemarks(student.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit Attendance
      </button>
    </div>
  );
};

export default TakeAttendance;