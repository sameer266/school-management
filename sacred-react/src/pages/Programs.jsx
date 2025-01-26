import React, { useState, useEffect } from 'react';
import '../style/pages_css/programs.css';

function Program() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to detect when the user has scrolled
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add event listener for scroll

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener on component unmount
    };
  }, []);

  return (
    <div className={`program-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Hero Section */}
      <header className="program-hero">
        <div className="hero-content">
          <h1>Our Programs</h1>
          <p>Discover the programs that shape the future of our students.</p>
        </div>
      </header>

      {/* Program Grid Section */}
      <section className="program-grid">
        <div className="program-card">
          <div className="card-icon">🎓</div>
          <h2>Academic Excellence</h2>
          <p>
            Our academic programs are designed to challenge and inspire students, 
            fostering critical thinking and a love for learning.
          </p>
          <button className="card-button">Learn More</button>
        </div>

        <div className="program-card">
          <div className="card-icon">⚽</div>
          <h2>Sports & Athletics</h2>
          <p>
            We offer a wide range of sports programs to promote physical fitness, 
            teamwork, and leadership skills.
          </p>
          <button className="card-button">Learn More</button>
        </div>

        <div className="program-card">
          <div className="card-icon">🎨</div>
          <h2>Arts & Creativity</h2>
          <p>
            Our arts programs encourage students to explore their creativity through 
            music, drama, visual arts, and more.
          </p>
          <button className="card-button">Learn More</button>
        </div>

        <div className="program-card">
          <div className="card-icon">🌍</div>
          <h2>Global Citizenship</h2>
          <p>
            We prepare students to be global citizens through cultural exchange programs, 
            language studies, and community service.
          </p>
          <button className="card-button">Learn More</button>
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="program-cta">
        <h2>Join Our Community</h2>
        <p>Enroll your child today and let them experience the best in education and personal growth.</p>
        <button className="cta-button">Enroll Now</button>
      </div>
    </div>
  );
}

export default Program;