// src/components/WhiteFadeOverlay.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../style/comp_css/whitefade.css'; // Create this CSS file

const WhiteFadeOverlay = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const location = useLocation();
  
    useEffect(() => {
      // Trigger the overlay animation on route change or page load
      setShowOverlay(true);
  
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1000); // Match this duration with the CSS animation duration
  
      return () => clearTimeout(timer);
    }, [location]); // Trigger effect on route change or page load
  
    return showOverlay ? <div className="white-fade-overlay"></div> : null;
  };

export default WhiteFadeOverlay;