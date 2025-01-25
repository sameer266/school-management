import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/comp_css/navbar.css";
import Logo from "../images/logo.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_type = useSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  // Navigate to the appropriate dashboard based on user type
  const handleDashboardClick = () => {
   
      const dashboardRoutes = {
        "1": "/adminHod-dashboard",
        "2": "/staff-dashboard",
        "3": "/student-dashboard",
      };
      navigate(dashboardRoutes[user_type]);
    
  };

  // Handle user logout
  const handleOnLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/logout/");
      localStorage.clear();
      navigate("/"); // Navigate to home page after logout
      window.location.reload();
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

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMenuOpen) toggleMenu();
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  // Close menu on window resize if width is greater than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) toggleMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <button
          className="mobile-nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/programs">Programs</Link></li>
          <li><Link to="/news-events">News/Events</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {isAuthenticated && (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleDashboardClick}>
                Dashboard
              </a>
            </li>
          )}
        </ul>
        <div className="login-button" style={{ cursor: "pointer" }}>
          {isAuthenticated ? (
            <a onClick={handleOnLogout}>Logout</a>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
   
     
      <div
        className={`overlay ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
    </nav>
  );
};

export default Navbar;
