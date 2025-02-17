import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/comp_css/navbar.css";
import Logo from "../images/logo.jpg";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaHome, FaInfoCircle, FaBook, FaNewspaper, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Loader } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_type = useSelector((state) => state.auth.user_type);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Navigate to the appropriate dashboard based on user type
  const handleDashboardClick = () => {
    const dashboardRoutes = {
      "1": "/adminHod-dashboard",
      "2": "/staff-dashboard",
      "3": "/student-dashboard",
    };
    navigate(dashboardRoutes[user_type]);
    closeMenu(); // Close the menu after navigation
  };

  // Handle user logout
  const handleOnLogout = async () => {
    setLoader(true);
    try {

      const response = await axios.post("http://127.0.0.1:8000/logout/");
      if (response && response.data.success){
      localStorage.clear();
      setLoader(false);
      navigate("/"); // Navigate to home page after logout
      window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  // Close menu on window resize if width is greater than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <>
    {
      loader? 
      <Loader/> :
      
    
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <button
          className="mobile-nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
        </button>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              <FaInfoCircle className="nav-icon" /> About Us
            </Link>
          </li>
          <li>
            <Link to="/programs" onClick={closeMenu}>
              <FaBook className="nav-icon" /> Programs
            </Link>
          </li>
          <li>
            <Link to="/news-events" onClick={closeMenu}>
              <FaNewspaper className="nav-icon" /> News/Events
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              <FaEnvelope className="nav-icon" /> Contact Us
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleDashboardClick}>
                <FaUser className="nav-icon" /> Dashboard
              </a>
            </li>
          )}
        </ul>
        <div className="login-button">
          {isAuthenticated ? (
            <a onClick={handleOnLogout} style={{ cursor: "pointer" }}>
              <FaSignOutAlt className="nav-icon" /> Logout
            </a>
          ) : (
            <Link to="/login" onClick={closeMenu} style={{ cursor: "pointer" }}>
              <FaSignInAlt className="nav-icon" /> Login
            </Link>
          )}
        </div>
      </div>
      <div
        className={`overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </nav>
}
    </>
  );
};

export default Navbar;