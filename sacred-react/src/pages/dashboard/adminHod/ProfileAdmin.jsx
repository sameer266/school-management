import React, { useEffect, useState } from "react";
import { Admin_Profile } from "../../../api_Data/adminHod_api";
import '../../../style/pages_css/dashboard/adminHod_css/profileadmin.css'; // Adjust path if needed
import BackButton from "../../../components/BackButton";
import { FaUser, FaEnvelope, FaPhone, FaCheck, FaMapMarkerAlt, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
import Loader from "../../../components/Loader";

// Component to display admin profile
function ProfileAdmin() {
  const [adminData, setAdminData] = useState(null); // State to store admin data

  useEffect(() => {
    // Fetch admin data from API on component mount
    const fetchAdminData = async () => {
      try {
        const response = await Admin_Profile();
        setAdminData(response.message); // Store the fetched data
      } catch (error) {
        console.error("Error fetching admin data:", error); // Handle error
      }
    };

    fetchAdminData(); // Call the function on mount
  }, []);

  return (
    <>
      <BackButton />
      <div className="profile-container">
        {adminData ? (
          <>
            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-picture">
                <img
                  src={`http://127.0.0.1:8000${adminData.image}`} // Use the image URL from API
                  alt="Admin Profile"
                  className="profile-img"
                />
              </div>
              <div className="profile-name">
                <h1>
                  <FaUser /> {adminData.admin.first_name} {adminData.admin.last_name}
                </h1>
                <p><strong>Username:</strong> {adminData.admin.username}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="profile-details">
                <p><FaEnvelope /> <strong>Email:</strong> {adminData.admin.username}</p>
                <p><FaPhone /> <strong>Phone:</strong> {adminData.contact_number}</p>
                <p><FaMapMarkerAlt /> <strong>Address:</strong> {adminData.address}</p>
                <p><FaVenusMars /> <strong>Gender:</strong> {adminData.gender}</p>
              </div>
            </div>

            {/* Role Information */}
            <div className="profile-section">
              <h2>Role Information</h2>
              <div className="profile-details">
                <p><FaCheck /> <strong>Role:</strong> {adminData.role}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="profile-section">
              <h2>Other Information</h2>
              <div className="profile-details">
                <p><FaCalendarAlt /> <strong>Created At:</strong> {new Date(adminData.created_at).toDateString()}</p>
                <p><FaCalendarAlt /> <strong>Updated At:</strong> {new Date(adminData.updated_at).toDateString()}</p>
              </div>
            </div>
          </>
        ) : (
          <Loader /> // Show loader while data is being fetched
        )}
      </div>
    </>
  );
}

export default ProfileAdmin;
