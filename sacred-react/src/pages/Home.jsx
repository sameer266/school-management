import React from 'react';
import '../style/pages_css/home.css'; // Import CSS file

import Home_Img from '../images/school_photo.jpg'; // Replace with your hero image

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
          <h1>Welcome to Sacred Heart Academy School</h1>
          <p>Where learning meets excellence</p>
        </div>
      </div>

      {/* School Overview Section */}
      <div className="school-overview">
        <h2>About Us</h2>
        <p>Sacred Heart Academy School is a place where academic excellence meets holistic development. We provide quality education and an environment that nurtures the overall growth of students.</p>
        <p>Our focus is on providing a balanced curriculum that promotes both intellectual and emotional development. We strive to create a caring and inclusive community for our students.</p>
      </div>

      {/* School Mission & Vision Section */}
      <div className="mission-vision">
        <div className="mission">
          <h3>Our Mission</h3>
          <p>To provide a transformative education that fosters critical thinking, creativity, and compassion, preparing students to face the challenges of the future with confidence.</p>
        </div>
        <div className="vision">
          <h3>Our Vision</h3>
          <p>To be a leading institution in providing a well-rounded education that empowers students to succeed in their academic and personal lives.</p>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="facilities">
        <h2>Our Facilities</h2>
        <ul>
          <li>Spacious Classrooms</li>
          <li>State-of-the-art Science and Computer Labs</li>
          <li>Sports Complex and Playground</li>
          <li>Library with a wide range of books and resources</li>
          <li>Music and Art Rooms</li>
          <li>Safe and Secure Campus</li>
        </ul>
      </div>

      {/* Achievements Section */}
      <div className="achievements">
        <h2>Our Achievements</h2>
        <ul>
          <li>Top performer in national academic competitions</li>
          <li>Excellence in sports with multiple district-level awards</li>
          <li>Over 95% graduation rate with successful college admissions</li>
          <li>Recognition for community outreach programs</li>
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="gallery">
        {/* Replace these with real images */}
        <img src="gallery1.jpg" alt="Gallery 1" className="gallery-item" />
        <img src="gallery2.jpg" alt="Gallery 2" className="gallery-item" />
        <img src="gallery3.jpg" alt="Gallery 3" className="gallery-item" />
      </div>
    </div>
  );
}

export default Home;
