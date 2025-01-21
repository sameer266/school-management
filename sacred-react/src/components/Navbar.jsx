import React, { useState, useEffect } from 'react';
import '../style/comp_css/navbar.css'; // Import your CSS file

import Logo from "../images/logo.jpg"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  // Close the menu if escape key is pressed
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Close menu on resize (if it was open in mobile view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <button className="mobile-nav-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
    </nav>
  );
};

export default Navbar;
