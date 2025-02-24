import React, { useState, useEffect } from 'react';
import { AdminHod_Home } from '../../../api_Data/adminHod_api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import adminNavigationLink from './Link';
import "../../../style/pages_css/dashboard/adminHod_css/adminHod.css";
import Sidebar from '../../../components/Sidebar'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AdminHod() {
  const [adminHodData, setAdminHodData] = useState(null);

  useEffect(() => {
    const fetchAdminHodData = async () => {
      try {
        const data = await AdminHod_Home();
        if (data.success) {
          setAdminHodData(data.data);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };
    fetchAdminHodData();
  }, []);

  if (!adminHodData) {
    return <div>Loading...</div>;
  }

  // Bar Chart data (Total Students, Staff, and Subjects)
  const barChartData = {
    labels: ['Total Students', 'Total Staff', 'Total Subjects'],
    datasets: [
      {
        label: 'Dashboard Statistics',
        data: [adminHodData.total_students, adminHodData.total_staffs, adminHodData.total_subjects],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)'],
        hoverBackgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // New Bar Chart data for Present vs Absent today
  const attendanceBarChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: "Today's Attendance",
        data: [adminHodData.today_attendance, adminHodData.today_absent],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        hoverBackgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
      },
    ],
  };

  const attendanceBarChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Pie Chart data (Students vs Staff)
  const pieChartData = {
    labels: ['Students', 'Staff'],
    datasets: [
      {
        data: [adminHodData.total_students, adminHodData.total_staffs],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        hoverBackgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // List of motivational quotes
  const quotes = [
    "The best way to predict the future is to create it.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Don't watch the clock; do what it does. Keep going.",
    "Believe you can and you're halfway there.",
    "Opportunities don't happen, you create them."
  ];

  // Randomly select a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <Sidebar links={adminNavigationLink} />
      <div className="staff-main-content">
        <h1>Admin Dashboard</h1>

        <div className="metric-cards">
          <div className="card">
            <h2>Total Students</h2>
            <p>{adminHodData.total_students}</p>
            <button>More Info</button>
          </div>
          <div className="card">
            <h2>Total Staff</h2>
            <p>{adminHodData.total_staffs}</p>
            <button>More Info</button>
          </div>
       
          <div className="card">
            <h2>Today Total Present</h2>
            <p>{adminHodData.total_present}</p>
            <button>More Info</button>
          </div>
          <div className="card">
            <h2>Total Subjects</h2>
            <p>{adminHodData.total_subjects}</p>
            <button>More Info</button>
          </div>
        </div>

        <div className="charts">
          <div className="chart-container">
            <h2>Dashboard Statistics (Bar Chart)</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="chart-container">
            <h2>Today's Attendance (Present vs Absent)</h2>
            <Bar data={attendanceBarChartData} options={attendanceBarChartOptions} />
          </div>
          <div className="chart-container">
            <h2>Staff vs Students (Pie Chart)</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Display random quote */}
        <div className="quote-section">
          <h3>Inspirational Quote</h3>
          <p>{randomQuote}</p>
        </div>
      </div>
    </>
  );
}

export default AdminHod;
