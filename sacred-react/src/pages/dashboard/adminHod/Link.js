import { FaHome, FaUsers, FaUserPlus, FaBook, FaIdCard, FaUser,FaClipboardList,FaMoneyBill,FaNewspaper} from 'react-icons/fa'; // Import icons
import { FcLeave } from "react-icons/fc";
import { IoLibrary } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";

const adminNavigationLink = [
    { to: "/adminHod-dashboard", label: "Home", icon: <FaHome /> },
    {to:"/adminHod-profile", label: "Profile", icon: <FaUser /> },
    { to: "/manage-staff", label: "Manage Staff", icon: <FaUsers /> },

    { to: "/manage-student", label: "Manage Student", icon: <PiStudentBold /> },
    { to: "/view-attendance", label: "View Attendance", icon: <FaClipboardList /> },
    { to:"/manage-subject", label: "Manage Subject", icon: <FaBook /> },
    { to:"/manage-bill" ,label:"Manage Bill", icon:<FaMoneyBill/>},
    { to :"/manage-library", label:"Manage Libraray", icon:<IoLibrary />},
    { to:"/manage-newspaper" , label:"Manage Newspaper", icon:<FaNewspaper/>},
    { to:"/manage-leave" ,label:"Manage Leaves",icon:<FcLeave/>},
    { to: "/view-studentID-card", label: "Student ID Card", icon: <FaIdCard /> },
    { to: "/view-staffID-card", label: "Staff ID Card", icon: <FaIdCard /> }

];

export default adminNavigationLink;
