import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import "../../../style/pages_css/dashboard/staff_css/staff.css";
import Sidebar from '../../../components/Sidebar';
import staffNavigationLinks from './Links';
import { Staff_Home } from '../../../api_Data/staff_api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

function Staff() {
  const [staffdata, setStaffData] = useState({
    first_name: "",
    last_name: "",
    total_classes: 0,
    total_leaves: 0,
    total_students: 0,
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      const response = await Staff_Home();
      if (response) {
        setStaffData({
          first_name: response.user.name.first_name,
          last_name: response.user.name.last_name,
          total_classes: response.total_classes,
          total_leaves: response.total_leaves,
          total_students: response.total_students,
        });
      }
    };
    fetchStaffData();
  }, []);

  // Data for the charts
  const staffMetricsData = {
    labels: ['Total Classes', 'Total Leaves', 'Total Students'],
    datasets: [
      {
        label: 'Count',
        data: [staffdata.total_classes, staffdata.total_leaves, staffdata.total_students],
        backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
        borderColor: ['#3498db', '#e74c3c', '#2ecc71'],
        borderWidth: 1,
      },
    ],
  };

  const staffBarChartData = {
    labels: ['Total Classes', 'Total Leaves', 'Total Students'],
    datasets: [
      {
        label: 'Count',
        data: [staffdata.total_classes, staffdata.total_leaves, staffdata.total_students],
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 2,
      },
    ],
  };

  const staffLineChartData = {
    labels: ['Total Classes', 'Total Leaves', 'Total Students'],
    datasets: [
      {
        label: 'Count',
        data: [staffdata.total_classes, staffdata.total_leaves, staffdata.total_students],
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <>
      {/* Sidebar component with navigation links */}
      <Sidebar links={staffNavigationLinks} />

      <div className="main-content-staff">
        <h1>Welcome Staff {staffdata.first_name} {staffdata.last_name}</h1>

        {/* Metric cards displaying various statistics */}
        <div className="metric-cards">
          <div className="card">
            <h2>Total Classes Teaches</h2>
            <p>{staffdata.total_classes}</p>
          </div>
          <div className="card">
            <h2>Total Leaves</h2>
            <p>{staffdata.total_leaves}</p>
          </div>
          <div className="card">
            <h2>Total Students Teaches</h2>
            <p>{staffdata.total_students}</p>
          </div>
        </div>

        {/* Chart containers for staff data visualizations */}
        <div className="charts">
          <div className="chart-container">
            <h2>Staff Metrics (Pie Chart)</h2>
            <Pie data={staffMetricsData} />
          </div>
          <div className="chart-container">
            <h2>Staff Metrics (Bar Chart)</h2>
            <Bar data={staffBarChartData} />
          </div>
          <div className="chart-container">
            <h2>Staff Metrics (Line Chart)</h2>
            <Line data={staffLineChartData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Staff;