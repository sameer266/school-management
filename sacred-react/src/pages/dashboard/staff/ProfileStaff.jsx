import React, { useEffect, useState } from "react";
import { Staff_Home } from "../../../api_Data/staff_api";
import '../../../style/pages_css/dashboard/student_css/profilestudent.css';
import BackButton from "../../../components/BackButton";
import { FaUser, FaEnvelope, FaPhone, FaCheck, FaMapMarkerAlt, FaVenusMars, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import Loader from "../../../components/Loader";
// Component to display student profile
function ProfileStaff() {
    const [staffData, setstaffData] = useState(null); // State to store student data

    useEffect(() => {
        // Function to fetch student data from API
        const fetchstaffData = async () => {
            try {
                const response = await Staff_Home(); // Call API
                console.log(response.user);
                setstaffData(response.user); // Set response data to state
            } catch (error) {
                console.error("Error fetching student data:", error); // Log error if API call fails
            }
        };

        fetchstaffData(); // Fetch data on component mount
    }, []);

    return (
        <>
            <BackButton />

            <div className="profile-container">
                {staffData ? (
                    <>
                        {/* Profile Header */}
                        <div className="profile-header">
                            <div className="profile-picture">
                                <img
                                    src={`http://127.0.0.1:8000${staffData.image}`}
                                    alt="Student Profile"
                                    className="profile-img"
                                />
                            </div>
                            <div className="profile-name">
                                <h1>
                                    <FaUser /> {staffData.name.first_name} {staffData.name.last_name}
                                </h1>
                                <p><strong>Username:</strong> {staffData.name.username}</p>
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="profile-section">
                            <h2>Personal Information</h2>
                            <div className="profile-details">
                                <p>
                                    <FaEnvelope /> <strong>Email:</strong> {staffData.name.username}
                                </p>
                                <p>
                                    <FaPhone /> <strong>Phone:</strong> {staffData.contact_number}
                                </p>
                                <p>
                                    <FaMapMarkerAlt /> <strong>Address:</strong> {staffData.address}
                                </p>
                                <p>
                                    <FaVenusMars /> <strong>Gender:</strong> {staffData.gender}
                                </p>
                            </div>
                        </div>

                        {/* Academic Information Section */}
                        <div className="profile-section">
                            <h2>Academic Details</h2>
                            <div className="profile-details">
                                <p>
                                    <FaGraduationCap /> <strong>Classes Teaches:</strong> {staffData.teaches_classes.map((data,index)=>
                                    (
                                        <>
                                         <a key={index}>{data} </a> |
                                        </>
                                    ))}
                                </p>

                                <p> 
                                <FaCheck />  <strong>Class Teacher of class</strong> {staffData.subject_teaches} </p>
                               
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="profile-section">
                            <h2>Other Information</h2>
                            <div className="profile-details">
                                <p>
                                    <FaCalendarAlt /> <strong>Created At:</strong> {new Date(staffData.created_at).toDateString()}
                                </p>
                                <p>
                                    <FaCalendarAlt /> <strong>Updated At:</strong> {new Date(staffData.updated_at).toDateString()}
                                </p>
                            </div>
                        </div>

                      
                    </>
                ) : (
                    <Loader/> // Show loading message while data is being fetched
                )}
            </div>
        </>
    );
}

export default ProfileStaff;