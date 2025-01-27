import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import "../../../style/pages_css/dashboard/staff_css/staff.css";
import Sidebar from '../../../components/Sidebar';
import staffNavigationLinks from './Links';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

function Staff() {
  // Navigation links for the sidebar


  // Data for the charts
  const studentStaffData = {
    labels: ['Students', 'Staff'],
    datasets: [
      {
        label: 'Count',
        data: [122, 17],
        backgroundColor: ['#3498db', '#e74c3c'],
        borderColor: ['#3498db', '#e74c3c'],
        borderWidth: 1,
      },
    ],
  };

  const subjectsPerCourseData = {
    labels: ['Course A', 'Course B', 'Course C', 'Course D'],
    datasets: [
      {
        label: 'Subjects',
        data: [5, 7, 3, 7],
        backgroundColor: ['#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'],
        borderColor: ['#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'],
        borderWidth: 1,
      },
    ],
  };

  const studentsPerCourseData = {
    labels: ['Course A', 'Course B', 'Course C', 'Course D'],
    datasets: [
      {
        label: 'Students',
        data: [30, 45, 25, 22],
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 2,
      },
    ],
  };

  const studentsPerSubjectData = {
    labels: ['Math', 'Science', 'History', 'English'],
    datasets: [
      {
        label: 'Students',
        data: [40, 35, 20, 27],
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {/* Sidebar component with navigation links */}
      <Sidebar links={staffNavigationLinks} />

      <div className="main-content">
        <h1>Staff Dashboard</h1>

        {/* Metric cards displaying various statistics */}
        <div className="metric-cards">
          <div className="card">
            <h2>Total Students</h2>
            <p>122</p>
            <button>More Info</button>
          </div>
          <div className="card">
            <h2>Total Staff</h2>
            <p>17</p>
            <button>More Info</button>
          </div>
          <div className="card">
            <h2>Total Courses</h2>
            <p>11</p>
            <button>More Info</button>
          </div>
          <div className="card">
            <h2>Total Subjects</h2>
            <p>22</p>
            <button>More Info</button>
          </div>
        </div>

        {/* Chart containers for various data visualizations */}
        <div className="charts">
          <div className="chart-container">
            <h2>Student and Staff Distribution</h2>
            <Pie data={studentStaffData} />
          </div>
          <div className="chart-container">
            <h2>Subjects per Course</h2>
            <Pie data={subjectsPerCourseData} />
          </div>
          <div className="chart-container">
            <h2>Students per Class (Teacher teaches class)</h2>
            <Line data={studentsPerCourseData} />
          </div>
          <div className="chart-container">
            <h2>Students per Subject</h2>
            <Line data={studentsPerSubjectData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Staff;