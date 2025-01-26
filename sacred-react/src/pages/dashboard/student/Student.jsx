import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import "../../../style/pages_css/dashboard/student_css/student.css";
import Sidebar from '../../../components/Sidebar';
import { Student_Home } from '../../../api_Data/student_api';
import studentNavigationLink from '../student/Links';
import { FaUser, FaCalendarCheck, FaCalendarTimes, FaChartBar, FaInfoCircle } from 'react-icons/fa'; // Icons for cards

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Student() {
  const [studentdata, setStudentData] = useState({
    message: { name: { first_name: '', last_name: '' } },
    total_attendance: 0,
    total_leaves: 0,
    total_absence: 0,
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await Student_Home();
      if (response && response.message) {
        setStudentData(response);
      } else {
        console.error("Unexpected response structure:", response);
      }
    };
    fetchStudentData();
  }, []);

  // Calculate Total Present from Total Attendance and Total Leaves
  const totalPresent = studentdata.total_attendance - studentdata.total_leaves;

  // Student Attendance Data
  const studentAttendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: '# of Days',
        data: [totalPresent, studentdata.total_absence],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Student Leave Data
  const studentLeaveData = {
    labels: ['Total Leave'],
    datasets: [
      {
        label: '# of Days',
        data: [studentdata.total_leaves],
        backgroundColor: ['#FFCE56'],
        hoverBackgroundColor: ['#FFCE56'],
      },
    ],
  };

  // Comparison Chart (Attendance vs Leave for Single Student)
  const attendanceVsLeaveData = {
    labels: ['Present', 'Absent', 'Leave Taken'],
    datasets: [
      {
        label: 'Student Status (Attendance vs Leave)',
        data: [totalPresent, studentdata.total_absence, studentdata.total_leaves],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Sidebar links={studentNavigationLink} />
      <div className="main-content">
        <h1 className="dashboard-title">
          Welcome, {studentdata.message.name?.first_name} {studentdata.message.name?.last_name}!
        </h1>

        {/* Metric Cards */}
        <div className="metric-cards">
          <div className="card">
            <div className="card-icon">
              <FaCalendarCheck />
            </div>
            <h2>Total Attendance</h2>
            <p>{studentdata.total_attendance}</p>
            <button className="info-button">
              <FaInfoCircle /> More Info
            </button>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaCalendarTimes />
            </div>
            <h2>Total Leave</h2>
            <p>{studentdata.total_leaves}</p>
            <button className="info-button">
              <FaInfoCircle /> More Info
            </button>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaUser />
            </div>
            <h2>Total Present</h2>
            <p>{totalPresent}</p>
            <button className="info-button">
              <FaInfoCircle /> More Info
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts">
          <div className="chart-container">
            <h2>Student Attendance</h2>
            <Pie data={studentAttendanceData} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h2>Student Leave</h2>
            <Pie data={studentLeaveData} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h2>Attendance vs Leave Comparison</h2>
            <Bar data={attendanceVsLeaveData} options={chartOptions} />
          </div>
        </div>

        {/* Additional Content */}
        <div className="additional-content">
          <h2>Quick Tips for Students</h2>
          <ul>
            <li>📚 Stay organized with a daily planner.</li>
            <li>⏰ Attend all classes to maximize learning.</li>
            <li>📝 Submit assignments on time to avoid penalties.</li>
            <li>💡 Ask questions and participate in class discussions.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Student;