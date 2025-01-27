import { FaHome, FaUser, FaCalendarCheck, FaBook, FaPenAlt, FaClipboardList, FaBookOpen, FaSignOutAlt, FaBell } from "react-icons/fa";

const staffNavigationLinks = [
  
    { to : "/staff-profile" ,label :" Profile", icon: <FaUser/>},
    { to: "/add-attendence", label: "Manage Attendance", icon: <FaCalendarCheck /> },
    { to: "/add-homework", label: "Manage Homework", icon: <FaBook /> },
    { to: "/view-student-homework", label: "Student Homework", icon: <FaPenAlt /> },
    { to: "/add-Exam", label: "Add Exam", icon: <FaClipboardList /> },
    { to: "/manage-library", label: "Manage Library", icon: <FaBookOpen /> },
    { to: "/satff-leave", label: "Apply Leave", icon: <FaSignOutAlt /> },
    { to: "/staff-notice", label: "View Notice", icon: <FaBell /> }
];

export default staffNavigationLinks;