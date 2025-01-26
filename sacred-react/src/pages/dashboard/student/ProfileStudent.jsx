import React, { useEffect, useState } from "react";
import { Student_Home } from "../../../api_Data/student_api";
import '../../../style/pages_css/dashboard/student_css/profilestudent.css';
import BackButton from "../../../components/BackButton";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaGraduationCap, FaCalendarAlt, FaEdit } from 'react-icons/fa'; // Icons for better UI

// Component to display student profile
function ProfileStudent() {
    const [studentData, setStudentData] = useState(null); // State to store student data

    useEffect(() => {
        // Function to fetch student data from API
        const fetchStudentData = async () => {
            try {
                const response = await Student_Home(); // Call API
                console.log(response);
                setStudentData(response.message); // Set response data to state
            } catch (error) {
                console.error("Error fetching student data:", error); // Log error if API call fails
            }
        };

        fetchStudentData(); // Fetch data on component mount
    }, []);

    return (
        <>
            <BackButton />

            <div className="profile-container">
                {studentData ? (
                    <>
                        {/* Profile Header */}
                        <div className="profile-header">
                            <div className="profile-picture">
                                <img
                                    src={`http://127.0.0.1:8000${studentData.image}`}
                                    alt="Student Profile"
                                    className="profile-img"
                                />
                            </div>
                            <div className="profile-name">
                                <h1>
                                    <FaUser /> {studentData.name.first_name} {studentData.name.last_name}
                                </h1>
                                <p><strong>Username:</strong> {studentData.name.username}</p>
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="profile-section">
                            <h2>Personal Information</h2>
                            <div className="profile-details">
                                <p>
                                    <FaEnvelope /> <strong>Email:</strong> {studentData.name.username}
                                </p>
                                <p>
                                    <FaPhone /> <strong>Phone:</strong> {studentData.contact_number}
                                </p>
                                <p>
                                    <FaMapMarkerAlt /> <strong>Address:</strong> {studentData.address}
                                </p>
                                <p>
                                    <FaVenusMars /> <strong>Gender:</strong> {studentData.gender}
                                </p>
                            </div>
                        </div>

                        {/* Academic Information Section */}
                        <div className="profile-section">
                            <h2>Academic Details</h2>
                            <div className="profile-details">
                                <p>
                                    <FaGraduationCap /> <strong>Class:</strong> {studentData.class_id.name}
                                </p>
                                <p>
                                    <FaGraduationCap /> <strong>Class ID:</strong> {studentData.class_id.id}
                                </p>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="profile-section">
                            <h2>Other Information</h2>
                            <div className="profile-details">
                                <p>
                                    <FaCalendarAlt /> <strong>Created At:</strong> {new Date(studentData.created_at).toDateString()}
                                </p>
                                <p>
                                    <FaCalendarAlt /> <strong>Updated At:</strong> {new Date(studentData.updated_at).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="update-button-container">
                            <button className="update-btn">
                                <FaEdit /> Update Profile
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="loading-message">Loading...</p> // Show loading message while data is being fetched
                )}
            </div>
        </>
    );
}

export default ProfileStudent;