import React from 'react';
import '../style/pages_css/aboutus.css';
import { FaHistory, FaBullhorn, FaEye, FaSchool } from 'react-icons/fa';  // Importing icons

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <div className="about-us-hero">
        <div className="hero-content">
          <h1>
            About Our School 
            <span className="namaste">🙏</span> {/* Namaste Emoji */}
          </h1>
          <p>Discover our story, mission, and vision for a brighter future.</p>
        </div>
        <div className="hero-image">
          <FaSchool className="school-icon" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="about-us-content">
        {/* Our Story Section */}
        <section className="about-us-section story-section">
          <div className="section-header">
            <FaHistory className="section-icon" />
            <h2>Our Story</h2>
          </div>
          <p>
            Established in 1995, our school has been a cornerstone of academic excellence and community growth. 
            From humble beginnings, we have grown into a thriving institution that nurtures young minds and prepares 
            them for the challenges of tomorrow. Our journey is one of dedication, innovation, and a commitment to 
            shaping future leaders.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="about-us-section mission-section">
          <div className="section-header">
            <FaBullhorn className="section-icon" />
            <h2>Our Mission</h2>
          </div>
          <p>
            Our mission is to provide a holistic education that fosters intellectual, emotional, and social growth. 
            We aim to inspire students to become lifelong learners, critical thinkers, and responsible global citizens. 
            Through a supportive and inclusive environment, we empower every child to achieve their fullest potential.
          </p>
        </section>

        {/* Our Vision Section */}
        <section className="about-us-section vision-section">
          <div className="section-header">
            <FaEye className="section-icon" />
            <h2>Our Vision</h2>
          </div>
          <p>
            We envision a world where every student is equipped with the knowledge, skills, and values to make a positive 
            impact. Our school strives to be a beacon of innovation and excellence, shaping leaders who will drive change 
            and create a better future for all.
          </p>
        </section>
      </div>

      {/* Call to Action Section */}
      <div className="about-us-cta">
        <h2>Join Us on This Journey</h2>
        <p>We invite you to be a part of our vibrant community. Together, let's build a brighter future for our students.</p>
        <button className="cta-button">Learn More</button>
      </div>

      {/* Footer Section */}
      <div className="about-us-footer">
        <p>Thank you for choosing our school. We are excited to have you on this journey!</p>
      </div>
    </div>
  );
}

export default AboutUs;