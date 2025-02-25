import { FaHome, FaUsers, FaUserPlus, FaBook, FaIdCard, FaUser,FaClipboardList } from 'react-icons/fa'; // Import icons

const adminNavigationLink = [
    { to: "/adminHod-dashboard", label: "Home", icon: <FaHome /> },
    {to:"/adminHod-profile", label: "Profile", icon: <FaUser /> },
    { to: "/manage-staff", label: "Manage Staff", icon: <FaUsers /> },

    { to: "/manage-student", label: "Manage Student", icon: <FaBook /> },
    { to: "/add-student", label: "Add Student", icon: <FaUserPlus /> },  // Same icon for adding both staff and student
    { to: "/view-attendance", label: "View Attendance", icon: <FaClipboardList /> },
    { to: "/view-studentID-card", label: "Student ID Card", icon: <FaIdCard /> },
    { to: "/view-staffID-card", label: "Staff ID Card", icon: <FaIdCard /> }
];

export default adminNavigationLink;
