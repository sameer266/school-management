import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/comp_css/navbar.css"; // Import your CSS file
import Logo from "../images/logo.jpg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_type = useSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      if (user_type === "1") {
        navigate("/adminHod-dashboard");
      } else if (user_type === "2") {
        navigate("/staff-dashboard");
      } else if (user_type === "3") {
        navigate("/student-dashboard");
      }
    }
  };

  const handleOnLogout = () => {

    localStorage.clear();
    navigate("/");
    window.location.reload();
  };


  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
  };

  // Close the menu if escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  // Close menu on resize (if it was open in mobile view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="Logo" />
          </Link>
        </div>



        {/* Mobile menu toggle button */}
        <button
          className="mobile-nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>



        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/programs">Programs</Link>
          </li>
          <li>
            <Link to="/news-events">News/Events</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          {isAuthenticated &&  <li> <a style={{cursor:"pointer"}} onClick={handleDashboardClick}>Dashboard</a></li>}
        </ul>



        {/* Login button  and Logout*/}
        {isAuthenticated ? (
          <div className="login-button" style={{cursor:"pointer"}}>
            <a onClick={handleOnLogout}>Logout</a>
          </div>
        ) : (
          <div className="login-button" >
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>



      {/* Overlay for mobile menu */}
      <div
        className={`overlay ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
    </nav>
  );
};

export default Navbar;
