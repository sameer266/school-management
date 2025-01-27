import React from "react";
import "../../../style/pages_css/dashboard/staff_css/profileStaff.css"; // Import CSS for styling
import BackButton from "../../../components/BackButton";

function StaffProfile() {
    // Sample staff data (replace with actual data from your backend or state)
    const staffData = {
        name: "John Doe",
        role: "Mathematics Teacher",
        email: "john.doe@school.com",
        phone: "+123 456 7890",
        bio: "Dedicated and passionate educator with over 10 years of experience in teaching mathematics. Committed to fostering a positive learning environment for students.",
        profilePicture: "https://via.placeholder.com/150", // Replace with actual image URL
    };

    return (


            <>
            <BackButton/>


        <div className="staff-profile-container">
            <div className="profile-header">
                <h1>Staff Profile</h1>
            </div>

            <div className="profile-content">
                {/* Profile Picture */}
                <div className="profile-picture">
                    <img src={staffData.profilePicture} alt="Profile" />
                </div>

                {/* Staff Details */}
                <div className="staff-details">
                    <h2>{staffData.name}</h2>
                    <p className="role">{staffData.role}</p>

                    <div className="contact-info">
                        <p>
                            <strong>Email:</strong> {staffData.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {staffData.phone}
                        </p>
                    </div>

                    <div className="bio">
                        <h3>About Me</h3>
                        <p>{staffData.bio}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default StaffProfile;