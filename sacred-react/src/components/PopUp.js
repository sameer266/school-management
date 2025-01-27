import React, { useState, useEffect } from 'react';
import '../style/comp_css/popup.css'; // Import CSS file for styling
import BackgroundImage from '../images/admission.jpg';
function PopUp() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the popup after 3 seconds when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Close the popup
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>Admissions Open!</h2>
        <p>Enroll now for the academic year 2024-2025. Limited seats available!</p>
        <button className="cta-button" onClick={handleClose}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default PopUp;