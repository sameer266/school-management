import { FaUser, FaCalendarCheck, FaBook, FaMoneyBill, FaBell } from 'react-icons/fa';

// Define student navigation links with icons directly
const studentNavigationLink = [
  { to: "/student-profile", label: "Profile", icon: <FaUser /> },
  { to: "/view-attendance", label: "View Attendance", icon: <FaCalendarCheck /> },
  { to: "/view-homework", label: "View Homework", icon: <FaBook /> },
  { to: "/view-notice", label: "View Notice", icon: <FaBell /> },
  { to: "/view-bill", label: "View Bill", icon: <FaMoneyBill /> },
  { to: "/view-library", label: "View Library", icon: <FaBook /> },
  { to:"/apply-leave", label: "Apply Leave", icon: <FaCalendarCheck /> },
];

export default studentNavigationLink;
