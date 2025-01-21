import React, { useState, useEffect } from 'react';
import '../style/pages_css/programs.css'

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
      <header className="program-header">
        <h1>Our Program</h1>
        <p>Explore our exciting program offerings</p>
      </header>
      
      <section className="program-content">
        <div className="program-item">
          <h2>Program 1</h2>
          <p>Description of the first program.</p>
        </div>
        <div className="program-item">
          <h2>Program 2</h2>
          <p>Description of the second program.</p>
        </div>
        <div className="program-item">
          <h2>Program 3</h2>
          <p>Description of the third program.</p>
        </div>
      </section>
    </div>
  );
}

export default Program;
