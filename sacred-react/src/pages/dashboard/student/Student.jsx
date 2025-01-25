import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

import "../../../style/pages_css/dashboard/student_css/student.css";
import Sidebar from '../../../components/Sidebar';
import { Student_Home } from '../../../api_Data/student_api';
import studentNavigationLink from '../student/Links';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Student() {

    const [studentdata, setStudentData] = useState({
        message: { name: { first_name: '', last_name: '' } },
        total_attendance: 0,
        total_leaves: 0,
        total_a: 0, // Assuming 'total_a' could be for absents or another relevant field
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            const response = await Student_Home();
            console.log(response);
            if (response && response.message) {
                setStudentData(response);  // Ensure response.message contains the expected data
            } else {
                console.error("Unexpected response structure:", response);
            }
        }
        fetchStudentData();
    }, []);

    // Calculate Total Present from Total Attendance and Total Leaves
    const totalPresent = studentdata.total_attendance - studentdata.total_leaves;

    // Student Attendance Data
    const studentAttendanceData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: '# of Students',
                data: [totalPresent, studentdata.total_absence], // Dynamically calculate absentees from total_a
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
                label: '# of Students',
                data: [studentdata.total_leaves], // Use total_leaves only
                backgroundColor: ['#FFCE56'],
                hoverBackgroundColor: ['#FFCE56'],
            },
        ],
    };

    // Comparison Chart (Attendance vs Leave for Single Student)
    const attendanceVsLeaveData = {
        labels: ['Present', 'Absent', 'Leave Taken'],  // Labels for comparison
        datasets: [
            {
                label: 'Student Status (Attendance vs Leave)',
                data: [
                    totalPresent,  // Total Present Students
                    studentdata.total_absence, // Total Absent Students (calculated from total_a)
                    studentdata.total_leaves, // Total Leave Taken Students
                ],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'], // Colors for each data point
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
                <h1>Student {studentdata.message.name?.first_name} {studentdata.message.name?.last_name}</h1>

                <div className="metric-cards">
                    <div className="card">
                        <h2>Total Attendance</h2>
                        <p>{studentdata.total_attendance}</p>
                        <button>More Info</button>
                    </div>

                    <div className="card">
                        <h2>Total Leave</h2>
                        <p>{studentdata.total_leaves}</p>
                        <button>More Info</button>
                    </div>

                    <div className="card">
                        <h2>Total Present</h2>
                        <p>{totalPresent}</p>
                        <button>More Info</button>
                    </div>
                </div>

                <div className="charts">
                    {/* Student Attendance Chart */}
                    <div className="chart-container">
                        <h2>Student Attendance</h2>
                        <Pie data={studentAttendanceData} options={chartOptions} />
                    </div>

                    {/* Student Leave Chart */}
                    <div className="chart-container">
                        <h2>Student Leave</h2>
                        <Pie data={studentLeaveData} options={chartOptions} />
                    </div>

                    {/* Comparison Chart (Attendance vs Leave for Single Student) */}
                    <div className="chart-container">
                        <h2>Student Attendance vs Leave Comparison</h2>
                        <Bar data={attendanceVsLeaveData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Student;
