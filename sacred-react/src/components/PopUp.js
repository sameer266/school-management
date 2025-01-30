import React, { useState, useEffect, useRef } from 'react';
import '../style/comp_css/popup.css'; // Import CSS file for styling
import BackgroundImage from '../images/admission1.jpg';

function PopUp() {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  // Show the popup after 2 seconds when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Close the popup
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div
        className="popup-content"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        ref={popupRef}
      >
        <button
          className="close-button"
          onClick={handleClose}
          aria-label="Close popup"
        >
          &times;
        </button>
        <h2 id="popup-title">Admissions Open!</h2>
        <p>Enroll now for the academic year 2024-2025. Limited seats available!</p>
        <button className="cta-button" onClick={handleClose}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default PopUp;