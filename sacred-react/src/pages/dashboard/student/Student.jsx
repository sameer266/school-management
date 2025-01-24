import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import "../../../style/pages_css/dashboard/student_css/student.css"
import Sidebar from '../../../components/Sidebar';

ChartJS.register(ArcElement, Tooltip, Legend);

function Student() {

    const studentNavigationLink=[

        {to:"/student-dashboard",label:"Home"},
        {to:"/view-attendence",label:"View Attendence"},
        {to:"/view-homework",label:"View Homework"},
        {to:"/submit-homework",label:"Submit homework"}
    ]


    const studentStaffData = {
        labels: ['Students', 'Staff'],
        datasets: [
            {
                label: '# of People',
                data: [122, 17],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const subjectsPerCourseData = {
        labels: ['Course 1', 'Course 2', 'Course 3'],
        datasets: [
            {
                label: '# of Subjects',
                data: [5, 8, 9],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const studentsPerCourseData = {
        labels: ['Course 1', 'Course 2', 'Course 3'],
        datasets: [
            {
                label: '# of Students',
                data: [40, 50, 32],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const studentsPerSubjectData = {
        labels: ['Subject 1', 'Subject 2', 'Subject 3'],
        datasets: [
            {
                label: '# of Students',
                data: [20, 30, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
          <Sidebar links={studentNavigationLink}/>
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
                        <Pie data={studentStaffData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Total Subjects in Each Course</h2>
                        <Pie data={subjectsPerCourseData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Total Students in Each Course</h2>
                        <Pie data={studentsPerCourseData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Total Students in Each Subject</h2>
                        <Pie data={studentsPerSubjectData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Student;
