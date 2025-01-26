import React from 'react';
import '../style/pages_css/home.css'; // Import CSS file

// Import images
import Home_Img from '../images/school_photo.jpg';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';

import { GraduationCap, BookOpen, Trophy, Target, Users, Music } from 'lucide-react'; // Icons

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={Home_Img} // Hero Image
          alt="School Event"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>Welcome to Sacred Heart Academy</h1>
          <p>Where learning meets excellence</p>
          <button className="cta-button">Apply Now</button>
        </div>
      </div>

      {/* School Overview Section */}
      <div className="school-overview">
        <div className="overview-content">
          <span className="section-tag">About Us</span>
          <h2>Nurturing Minds, Building Futures</h2>
          <div className="overview-grid">
            <div className="overview-text">
              <p>
                Sacred Heart Academy is a place where academic excellence meets holistic development. 
                We provide quality education and an environment that nurtures the overall growth of students.
              </p>
              <p>
                Our focus is on providing a balanced curriculum that promotes both intellectual and emotional development. 
                We strive to create a caring and inclusive community for our students.
              </p>
            </div>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Graduation Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Dedicated Faculty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="mission-vision">
        <div className="section-header">
          <span className="section-tag">Our Purpose</span>
          <h2>Mission & Vision</h2>
        </div>
        <div className="mv-container">
          <div className="mission">
            <Target className="section-icon" />
            <h3>Our Mission</h3>
            <p>
              To provide a transformative education that fosters critical thinking, creativity, and compassion, 
              preparing students to face the challenges of the future with confidence.
            </p>
          </div>
          <div className="vision">
            <Trophy className="section-icon" />
            <h3>Our Vision</h3>
            <p>
              To be a leading institution in providing a well-rounded education that empowers students 
              to succeed in their academic and personal lives.
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="facilities">
        <div className="section-header">
          <span className="section-tag">Campus Life</span>
          <h2>Our Facilities</h2>
        </div>
        <div className="facilities-grid">
          <div className="facility-item">
            <GraduationCap className="facility-icon" />
            <h4>Modern Classrooms</h4>
            <p>Spacious and technology-enabled learning spaces</p>
          </div>
          <div className="facility-item">
            <BookOpen className="facility-icon" />
            <h4>Advanced Labs</h4>
            <p>State-of-the-art science and computer laboratories</p>
          </div>
          <div className="facility-item">
            <Trophy className="facility-icon" />
            <h4>Sports Complex</h4>
            <p>Multi-sport facilities and professional coaching</p>
          </div>
          <div className="facility-item">
            <Users className="facility-icon" />
            <h4>Library</h4>
            <p>Extensive collection of books and digital resources</p>
          </div>
          <div className="facility-item">
            <Music className="facility-icon" />
            <h4>Arts Center</h4>
            <p>Dedicated spaces for music, drama, and visual arts</p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="section-header">
          <span className="section-tag">Campus Life</span>
          <h2>Our Gallery</h2>
        </div>
        <div className="gallery">
          <img src={img1} alt="Campus Life" className="gallery-item" />
          <img src={img2} alt="Students" className="gallery-item" />
          <img src={img3} alt="Library" className="gallery-item" />
          <img src={img5} alt="Sports" className="gallery-item" />
          <img src={img6} alt="Events" className="gallery-item" />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join Our Community?</h2>
          <p>Take the first step towards an exceptional education journey</p>
          <button className="cta-button">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

export default Home;