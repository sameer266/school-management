import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaHome, FaInfoCircle, FaBook, FaNewspaper, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Loader } from "lucide-react";
import Logo from "../images/logo.jpg";
import "../style/comp_css/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_type = useSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDashboardClick = () => {
    const routes = { "1": "/adminHod-dashboard", "2": "/staff-dashboard", "3": "/student-dashboard" };
    navigate(routes[user_type] || "/");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/logout/");
      if (response?.data?.success) {
        navigate("/");
        localStorage.clear();
        window.location.reload();
        
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
          <div className="navbar-container">
            <div className="logo">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <button className="mobile-nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}><FaHome /> Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}><FaInfoCircle /> About Us</Link></li>
              <li><Link to="/programs" onClick={() => setIsMenuOpen(false)}><FaBook /> Programs</Link></li>
              <li><Link to="/news-events" onClick={() => setIsMenuOpen(false)}><FaNewspaper /> News/Events</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}><FaEnvelope /> Contact Us</Link></li>
              {isAuthenticated && (
                <li>
                  <span  onClick={handleDashboardClick} style={{ cursor: "pointer" }}>

                   <Link> <FaUser /> Dashboard</Link>
                  </span>
                </li>
              )}
            </ul>
            <div className="login-button">
              {isAuthenticated ? (
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  <Link><FaSignOutAlt /> Logout</Link>
                </span>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ cursor: "pointer" }}>
                  <FaSignInAlt /> Login
                </Link>
              )}
            </div>
          </div>
          <div className={`overlay ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}></div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
