import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import "../../../style/pages_css/dashboard/staff_css/staff.css";
import Sidebar from '../../../components/Sidebar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

function Staff() {
  // Navigation links for the sidebar
  const staffNavigationLinks = [
    { to: "/staff-dashboard", label: "Home" },
    { to: "/manage-attendence", label: "Manage Attendance" },
    { to: "/add-attendece", label: "Add Attendance" },
    { to: "/manage-homework", label: "Manage Homework" },
    { to: "/add-homework", label: "Add Homework" },
    { to: "/manage-library", label: "Manage Library" },
    { to: "/add-library", label: "Add Library" },
  ];

  return (
    <>
      {/* Sidebar component with navigation links */}
      <Sidebar links={staffNavigationLinks} />
      
      <div className="main-content">
        <h1>Student Dashboard</h1>

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
            <h2>Student and Staff Chart</h2>
            <canvas id="studentStaffChart"></canvas>
          </div>
          <div className="chart-container">
            <h2>Total Subjects in Each Course</h2>
            <canvas id="subjectsPerCourseChart"></canvas>
          </div>
          <div className="chart-container">
            <h2>Total Students in Each Course</h2>
            <canvas id="studentsPerCourseChart"></canvas>
          </div>
          <div className="chart-container">
            <h2>Total Students in Each Subject</h2>
            <canvas id="studentsPerSubjectChart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Staff;
