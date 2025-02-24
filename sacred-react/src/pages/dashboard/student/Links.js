import {
  FaUser,
  FaCalendarAlt,

  FaClipboardList,
  FaMoneyBillWave,
  FaBell,
  FaBookOpen,
  FaFileAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

// Define student navigation links with more relatable icons
const studentNavigationLink = [
  { to: "/student-profile", label: "Profile", icon: <FaUser /> }, // User profile
  { to: "/view-attendance", label: "View Attendance", icon: <FaCalendarAlt /> }, // Calendar for attendance
  { to: "/view-homework", label: "View Homework", icon: <FaFileAlt /> }, // File for homework
  { to: "/view-notice", label: "View Notice", icon: <FaBell /> }, // Bell for notices
  { to: "/view-bill", label: "View Bill", icon: <FaMoneyBillWave /> }, // Money bill for fees
  { to: "/view-library", label: "View Library", icon: <FaBookOpen /> }, // Open book for library
  { to: "/view-result", label: "View Result", icon: <FaClipboardList /> }, // Open book for library
  { to: "/apply-leave", label: "Apply Leave", icon: <FaSignOutAlt /> }, // Sign out for leave
];

export default studentNavigationLink;