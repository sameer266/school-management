import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";

import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Programs from "./pages/Programs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";


function App() {
  return (
   <>

   <Router>
  <Navbar/>

  <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path='/about' element={<AboutUs/>}/>
    <Route path='/programs' element={<Programs/>}/>
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path='/login' element={<Login/>} />


  </Routes>
  <Footer/>
   </Router>
   
   
   </>
  );
}

export default App;
