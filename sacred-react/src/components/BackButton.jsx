import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing an arrow icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function BackButton() {
  const navigate = useNavigate(); // Hook to access the navigation functionality

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page in history
  };

  return (
    <div
      onClick={handleGoBack}
      style={styles.button}
      title="Go Back" // Tooltip on hover
      role="button" // Accessibility: Indicates this is a clickable element
      tabIndex={0} // Accessibility: Makes the div focusable
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleGoBack(); // Allows keyboard navigation
        }
      }}
    >
      <FaArrowLeft size={24} color="#fff" /> {/* Using the left arrow icon */}
    </div>
  );
}

const styles = {
  button: {
    padding: '12px', // Adjusts the size of the icon container
    backgroundColor: '#3498db', // Background color of the icon
    borderRadius: '50%', // Makes it circular
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    position: 'fixed',
    top: '20px', // Adjusted position for better visibility
    left: '20px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px', // Size of the icon container
    height: '50px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
  },
  buttonHover: {
    backgroundColor: '#2980b9', // Darker shade on hover
    transform: 'scale(1.1)', // Slightly enlarges the button on hover
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)', // Enhances shadow on hover
  },
};

// Add hover effect using JavaScript
const addHoverEffect = () => {
  const button = document.querySelector('[role="button"]');
  if (button) {
    button.addEventListener('mouseenter', () => {
      Object.assign(button.style, styles.buttonHover);
    });
    button.addEventListener('mouseleave', () => {
      Object.assign(button.style, styles.button);
    });
  }
};

// Call the hover effect function after the component mounts
React.useEffect(() => {
  addHoverEffect();
}, []);

export default BackButton;