import { 
   FaUser, FaCalendarCheck, FaBook, 
    FaPenAlt, FaClipboardList, FaBookOpen, 
    FaSignOutAlt, FaBell, FaCheckSquare 
} from "react-icons/fa";

const staffNavigationLinks = [
    { to: "/staff-profile", label: "Profile", icon: <FaUser /> },
    { to: "/staff-take-attendance", label: "Take Attendance", icon: <FaCheckSquare /> }, // Added Icon
    { to: "/staff-add-attendance", label: "Manage Attendance", icon: <FaCalendarCheck /> },
    { to: "/staff-add-homework", label: "Manage Homework", icon: <FaBook /> },
    { to: "/view-student-homework", label: "Student Homework", icon: <FaPenAlt /> },
    { to: "/add-Exam", label: "Add Exam", icon: <FaClipboardList /> },
    { to: "/staff-manage-library", label: "Manage Library", icon: <FaBookOpen /> },
    { to: "/staff-leave", label: "Apply Leave", icon: <FaSignOutAlt /> }, // Fixed typo in 'satff-leave'
    { to: "/staff-notice", label: "View Notice", icon: <FaBell /> }
];

export default staffNavigationLinks;
