import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import AdminHod from "./pages/dashboard/adminHod/AdminHod";
import Staff from "./pages/dashboard/staff/Staff";
import Student from "./pages/dashboard/student/Student";
import AttendancePage from "./pages/dashboard/student/AttendancePage";
import HomeworkPage from "./pages/dashboard/student/HomeworkPage";
import NoticePage from "./pages/dashboard/student/NoticePage";
import BillPage from "./pages/dashboard/student/BillPage";
import ProfileStudent from "./pages/dashboard/student/ProfileStudent";
import LibraryPage from "./pages/dashboard/student/LibraryPage";
import ApplyLeave from "./pages/dashboard/student/ApplyLeave";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsEvent from "./pages/NewsEvents";
import HomeworkStaff from "./pages/dashboard/staff/HomeworkStaff";
import AttendanceStaff from "./pages/dashboard/staff/AttendanceStaff";
import LibraryStaff from "./pages/dashboard/staff/LibraryStaff";
import NoticeStaff from "./pages/dashboard/staff/NoticeStaff";
import StaffProfile from "./pages/dashboard/staff/StaffProfile";
import WhiteFadeOverlay from "./components/WhiteFadeOverlay";

function App() {
  return (
    <>
      <Router>

      <WhiteFadeOverlay/>
      
        <Navbar />

        <Routes>
          {/* Default route */}
          <Route path="/" element={<Home />} />

          {/* Static pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/news-events" element={<NewsEvent/>}/>
          <Route path="/login" element={<Login />} />

          {/* Dashboard routes    */}
          <Route path="/adminHod-dashboard" element={<AdminHod />} />



          <Route path="staff-profile" element={<StaffProfile/>}/>
          <Route path="/staff-dashboard" element={<Staff />} />
          <Route path="/staff-add-homework" element={<HomeworkStaff/>}/>
          <Route path="/staff-add-attendance" element={<AttendanceStaff/>}/>
          <Route path="/staff-manage-library" element={<LibraryStaff/>}/>
          <Route path="/staff-notice" element={<NoticeStaff/>}/>

          {/* Student Dashboard routes */}
          <Route path="/student-dashboard" element={<Student />} />
          <Route path="/student-profile" element={<ProfileStudent />} />
          <Route path="/view-attendance" element={<AttendancePage />} />
          <Route path="/view-homework" element={<HomeworkPage />} />
          <Route path="/view-notice" element={<NoticePage />} />
          <Route path="/view-bill" element={<BillPage />} />
          <Route path="/view-library" element={<LibraryPage/>} />
          <Route path="/apply-leave" element={<ApplyLeave/>} />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
