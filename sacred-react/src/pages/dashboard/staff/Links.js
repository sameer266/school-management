import { 
    FaUser, FaCalendarCheck, FaBook, 
    FaPenAlt, FaClipboardList, FaBookOpen, 
    FaSignOutAlt, FaBell, FaCheckSquare 
 } from "react-icons/fa";
 
 const staffNavigationLinks = [
     { to: "/staff-profile", label: "Profile", icon: <FaUser /> },
     { to: "/staff-take-attendance", label: "Take Attendance", icon: <FaCheckSquare /> }, // Added Icon
     { to: "/staff-view-attendance", label: "View Attendance", icon: <FaCalendarCheck /> },
     { to: "/staff-add-homework", label: "Manage Homework", icon: <FaBook /> },
     { to: "/staff-submitted-homework", label: "Submitted Homework", icon: <FaPenAlt /> } ,// New link added
     { to: "/staff-add-exam", label: "Add Exam", icon: <FaClipboardList /> },
     { to: "/staff-manage-library", label: "Manage Library", icon: <FaBookOpen /> },
     { to: "/staff-leave", label: "Apply Leave", icon: <FaSignOutAlt /> }, // Fixed typo in 'staff-leave'
     { to: "/staff-notice", label: "View Notice", icon: <FaBell /> },
    
 ];
 
 export default staffNavigationLinks;
 