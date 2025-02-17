import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Staff_Total_StudentsName ,Staff_Take_Student_Attendence} from '../../../api_Data/staff_api';
import '../../../style/pages_css/dashboard/staff_css/takeattendance.css';
import BackButton from '../../../components/BackButton';

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const notify=(msg)=>toast.success(msg);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await Staff_Total_StudentsName();
        console.log(response.message);
        setStudents(response.message.map(student => ({ ...student, present: null })));
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleAttendance = (id, status) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, present: status } : student
      )
    );
  };

  const handleSubmit = async () => {
    const attendanceData = students.map(student => ({
      id: student.id,
      status: student.present,
    }));
    console.log("Attendence Data", attendanceData)
    const response = await Staff_Take_Student_Attendence(attendanceData);
    if(response && response.data.success){
    
    notify('Attendance submitted successfully!')
    }
    
  };

  return (

    <>
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    <BackButton /> {/* Back button component */}


    <div className="take-attendance">
      
      <h1>Take Attendance</h1>
      <div className="student-list">
        {students.map(student => (
          <div key={student.id} className="student-item">
            <span className="student-name">{student.roll_no}. {student.name.first_name} {student.name.last_name}</span>
            <div className="attendance-buttons">
              <button 
                className={`attendance-btn ${student.present === true ? 'selected present' : ''}`} 
                onClick={() => handleAttendance(student.id, true)}
              >
                <FaCheck /> Present
              </button>
              <button 
                className={`attendance-btn ${student.present === false ? 'selected absent' : ''}`} 
                onClick={() => handleAttendance(student.id, false)}
              >
                <FaTimes /> Absent
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit Attendance</button>
    </div>
    </>
  );
};

export default TakeAttendance;
