import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigation hook
import { AdminHod_View_Student } from '../../../../api_Data/adminHod_api';
import { FaPlusCircle } from 'react-icons/fa';  // Import an icon (example: plus-circle)
import '../../../../style/pages_css/dashboard/adminHod_css/stundentCss/studentManage.css';  // Import CSS for styling
import BackButton from '../../../../components/BackButton';

function StudentManage() {
  const [studentData, setStudentData] = useState([]);
  const [groupedStudents, setGroupedStudents] = useState({});
  const [selectedClass, setSelectedClass] = useState('All'); // Default filter: show all classes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await AdminHod_View_Student();
        if (response?.success) {
          setStudentData(response.message);
          groupStudentsByClass(response.message); // Group students by class
        } else {
          setError('Failed to fetch student data');
        }
      } catch (err) {
        setError('An error occurred while fetching student data');
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  // Group students by their class name
  const groupStudentsByClass = (students) => {
    const grouped = students.reduce((acc, student) => {
      const className = student.class_id.name;
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(student);
      return acc;
    }, {});
    setGroupedStudents(grouped);
  };

  // Handle class filter change
  const handleClassFilter = (className) => {
    setSelectedClass(className);
  };

  // Get unique class names for the filter
  const classNames = Object.keys(groupedStudents);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="student-manage-container">
      <BackButton />
      
      <h1 className="title">Manage Students</h1>

      {/* Add student Button with Icon */}
      <button 
        className="add-student-btn" 
        onClick={() => navigate('/add-student')} // Redirect to the add student page
      >
        <FaPlusCircle size={24} /> Add New Student
      </button>

      {/* Class Filter */}
      <div className="class-filter">
        <button 
          className={`filter-button ${selectedClass === 'All' ? 'active' : ''}`}
          onClick={() => handleClassFilter('All')}
        >
          All
        </button>
        {classNames.map((className) => (
          <button
            key={className}
            className={`filter-button ${selectedClass === className ? 'active' : ''}`}
            onClick={() => handleClassFilter(className)}
          >
            {className}
          </button>
        ))}
      </div>

      {/* Student List */}
      <div className="student-list">
        {selectedClass === 'All' ? (
          // Show all students if "All" is selected
          Object.entries(groupedStudents).map(([className, students]) => (
            <div key={className}>
              <h2 className="class-title">Class {className}</h2>
              {students.map((student) => (
                <div className="student-card" key={student.id}>
                  <div className="student-info">
                    <h3>{student.name.first_name} {student.name.last_name}</h3>
                    <p><strong>Email:</strong> {student.name.username}</p>
                    <p><strong>Phone:</strong> {student.contact_number}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Class:</strong> {student.class_id.name}</p>
                    <p><strong>Roll No:</strong> {student.roll_no}</p>
                  </div>
                  <button 
                    className="info-button" 
                    onClick={() => navigate(`/student-details/${student.id}`)}
                    
                  >
                    More Info
                  </button>
                </div>
              ))}
            </div>
          ))
        ) : (
          // Show students for the selected class
          groupedStudents[selectedClass]?.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="student-info">
                <h3>{student.name.first_name} {student.name.last_name}</h3>
                <p><strong>Email:</strong> {student.name.username}</p>
                <p><strong>Phone:</strong> {student.contact_number}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Class:</strong> {student.class_id.name}</p>
                <p><strong>Roll No:</strong> {student.roll_no}</p>
              </div>
              <button 
                className="info-button" 
                onClick={() => navigate(`/student-details/${student.id}`)}
              >
                More Info
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentManage;