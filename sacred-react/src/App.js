import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,useLocation } from "react-router-dom";


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

import NewsEvent from "./pages/NewsEvents";
import HomeworkStaff from "./pages/dashboard/staff/HomeworkStaff";
import AttendanceStaff from "./pages/dashboard/staff/AttendanceStaff";
import LibraryStaff from "./pages/dashboard/staff/LibraryStaff";
import NoticeStaff from "./pages/dashboard/staff/NoticeStaff";

import WhiteFadeOverlay from "./components/WhiteFadeOverlay";
import ChatBot from "./components/ChatBot";
import ProfileStaff from "./pages/dashboard/staff/ProfileStaff";
import TakeAttendance from "./pages/dashboard/staff/TakeAttendance";
import SubmittedHomework from "./pages/dashboard/staff/SubmittedHomework";
import ExamAdd from "./pages/dashboard/staff/ExamAdd";
import StaffLeave from "./pages/dashboard/staff/StaffLeave";
import ResultAdd from "./pages/dashboard/staff/ResultAdd";
import Result from "./pages/dashboard/student/Result";
import ProfileAdmin from "./pages/dashboard/adminHod/ProfileAdmin";
import StaffManage from "./pages/dashboard/adminHod/StaffManage/StaffManage";
import StudentManage from "./pages/dashboard/adminHod/StudentManage";
import SubjectManage from "./pages/dashboard/adminHod/SubjectManage";
import ViewAttendance from "./pages/dashboard/adminHod/ViewAttendance";
import OneStaffDetails from "./pages/dashboard/adminHod/StaffManage/OneStaffDetails";
import UpdateStaff from "./pages/dashboard/adminHod/StaffManage/UpdateStaff";
import AddStaff from "./pages/dashboard/adminHod/StaffManage/AddStaff";


// it automatically scrolls to the top instead of staying at the bottom.
function ScrollToTop() {
  const { pathname } = useLocation(); // Get current route

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Run effect when pathname changes

  return null;
}


function App() {

  
  return (
    <>
      <Router>
      <ScrollToTop /> 

      <WhiteFadeOverlay/>
      <ChatBot/>
      
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

          {/* AdminHod Dashboard routes */}
          <Route path="/adminHod-dashboard" element={<AdminHod />}/>

          <Route path="/manage-staff" element={<StaffManage/>}/>
          <Route path="/staff-details/:id" element={<OneStaffDetails/>}/>
          <Route path="/update-staff/:id" element={<UpdateStaff/>}/>
          <Route path="/add-staff" element={<AddStaff/>}/>

          <Route path="/manage-student" element={<StudentManage/>}/>
          <Route path="/manage-subject" element={<SubjectManage/>}/>
          <Route path="/view-attendance" element={<ViewAttendance/>}/>
          


          <Route path="/adminHod-profile" element={<ProfileAdmin/>}/>


         {/* Staff Dashboard routes */}
          <Route path="staff-profile" element={<ProfileStaff/>}/>
          <Route path="/staff-dashboard" element={<Staff />} />
          <Route path="/staff-add-homework" element={<HomeworkStaff/>}/>
          <Route path="/staff-submitted-homework" element={<SubmittedHomework/>}/>
          <Route path="/staff-take-attendance" element={<TakeAttendance/>}/>
          <Route path="/staff-view-attendance" element={<AttendanceStaff/>}/>
          <Route path="/staff-manage-library" element={<LibraryStaff/>}/>
          <Route path="/staff-notice" element={<NoticeStaff/>}/>
          <Route path="/staff-add-exam" element={<ExamAdd/>}/>
          <Route path="/staff-leave" element={<StaffLeave/>}/>
          <Route path="/staff-add-result" element={<ResultAdd/>}/>

          {/* Student Dashboard routes */}
          <Route path="/student-dashboard" element={<Student />} />
          <Route path="/student-profile" element={<ProfileStudent />} />
          <Route path="/view-attendance" element={<AttendancePage />} />
          <Route path="/view-homework" element={<HomeworkPage />} />
          <Route path="/view-notice" element={<NoticePage />} />
          <Route path="/view-bill" element={<BillPage />} />
          <Route path="/view-library" element={<LibraryPage/>} />
          <Route path="/view-result" element={<Result/>} />
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
