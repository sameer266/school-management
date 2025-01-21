import React from 'react';
import '../style/pages_css/aboutus.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>
          About Us 
          <span className="namaste">🙏</span> {/* Namaste Emoji */}
        </h1>
        <p>Get to know our story and mission</p>
      </div>
      <div className="about-us-content">
        <section className="about-us-description">
          <h2>Our Story</h2>
          <p>
            We are a passionate team committed to providing the best educational experience for our students.
            With a rich history and a future-focused approach, we aim to create a nurturing environment where 
            learning thrives.
          </p>
        </section>
        <section className="about-us-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to inspire and empower students to reach their full potential, both academically and personally.
            We strive to equip them with the skills and knowledge necessary for a successful future.
          </p>
        </section>
        <section className="about-us-vision">
          <h2>Our Vision</h2>
          <p>
            To become a leading educational institution that fosters creativity, innovation, and personal growth,
            shaping students who will make a positive impact in the world.
          </p>
        </section>
      </div>
      <div className="about-us-footer">
        <p>Thank you for choosing us. We are excited to have you on this journey!</p>
      </div>
    </div>
  );
}

export default AboutUs;
