import React from 'react';
import { Link } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

import "../../../style/pages_css/dashboard/adminHod_css/adminHod.css";
import Sidebar from '../../../style/pages_css/dashboard/adminHod_css/adminHod.css';





function AdminHod(){
    const adminNavigationLink=[

        {to:"/adminHod-dashboard",label:"Home"},
        {to:"/manage-staff",label:"Manage Staff"},
        {to:"/add-staff", label:"Add Staff"},
        {to:"/manage-student",label:"Manage Student"},
        {to:"/add-student", lable:"add-student"},
        {to:"/view-attendence", label:"view-attendence"},
        {to:"/view-studentID-card", label:"Student ID Card"},
        {to:"/view-staffID-card", label:"Staff ID Card"}

        

    ]
  return (
    <>
    
   <Sidebar  links={adminNavigationLink}/>
    <div className="main-content">
        <h1>Student Dashboard</h1>

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
    </div></>


    
  );
}

export default AdminHod;
