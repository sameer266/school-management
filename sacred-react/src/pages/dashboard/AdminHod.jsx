import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

import '../../style/pages_css/dashboard/adminHod.css'
import Sidebar from '../../components/Sidebar';
import TopNavigation from '../../components/TopNavigation';

// Register necessary chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,  // For Pie chart
  PointElement, // For Line chart (point elements like data points)
  LineElement,  // For Line chart
  Tooltip,
  Legend
);

const AdminHod = () => {
  const attendanceData = {
    labels: ['Absent', 'Present'],
    datasets: [{
      data: [5, 6], // Example data
      backgroundColor: ['#ff6347', '#32cd32'],
    }]
  };

  const attendanceStatistics = {
    labels: ['Java', 'PHP', 'MySQL', 'HTML'],
    datasets: [{
      label: 'Present in Class',
      data: [5, 3, 1, 4], // Example data
      backgroundColor: '#4caf50',
    }, {
      label: 'Absent in Class',
      data: [1, 2, 3, 0],
      backgroundColor: '#ff5722',
    }]
  };

  return (

    <>

<div style={{ display: 'flex' }}>
      {/* Sidebar Component */}
      <Sidebar />

 
    <div className="wrapper">
      {/* Sidebar and TopNavigation components here */}
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="info-box">
                <span className="info-box-icon bg-info"><i className="fas fa-users"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Attendance</span>
                  <span className="info-box-number">11</span>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="info-box">
                <span className="info-box-icon bg-success"><i className="fas fa-check-circle"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Present</span>
                  <span className="info-box-number">6</span>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="info-box">
                <span className="info-box-icon bg-danger"><i className="fas fa-times-circle"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Absent</span>
                  <span className="info-box-number">5</span>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="info-box">
                <span className="info-box-icon bg-warning"><i className="fas fa-book"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Subjects</span>
                  <span className="info-box-number">4</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <h3>Attendance Chart</h3>
              <Pie data={attendanceData} key="pie-chart" />
            </div>
            <div className="col-6">
              <h3>Attendance Statistics</h3>
              <Line data={attendanceStatistics} key="line-chart" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default AdminHod;
