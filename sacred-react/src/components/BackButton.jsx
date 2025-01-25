import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';  // Importing an arrow icon from react-icons
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

function BackButton() {
  const navigate = useNavigate(); // Hook to access the navigation functionality

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page in history
  };

  return (
    <div
      onClick={handleGoBack}
      style={styles.button}
      title="Go Back"  // Tooltip on hover
    >
      <FaArrowLeft size={30} color="#fff" />  {/* Using the left arrow icon */}
    </div>
  );
}

const styles = {
  button: {
    padding: '10px',  // Adjusts the size of the icon container
    backgroundColor: '#3498db',  // Background color of the icon
    borderRadius: '50%',  // Makes it circular
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    position: 'fixed',
    top: '100px',
    left: '20px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',  // Size of the icon container
    height: '50px',
  },
};

export default BackButton;
