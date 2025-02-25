import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigation hook
import { AdminHod_View_Staff } from '../../../api_Data/adminHod_api';
import BackButton from '../../../components/BackButton';
import '../../../style/pages_css/dashboard/adminHod_css/staffManage.css';

function StaffManage() {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const fetchStaffData = async () => {
      const response = await AdminHod_View_Staff();
      if (response?.success) {
        setStaffData(response.message);
      }
    };
    fetchStaffData();
  }, []);

  return (
    <div className="staff-manage-container">
      <BackButton />
      <h1 className="title">Manage Staff</h1>
      <div className="staff-list">
        {staffData.map((staff) => (
          <div className="staff-card" key={staff.id}>
            <h3>{staff.name.first_name}</h3>
            <p><strong>Email:</strong> {staff.name.username}</p>
            <p><strong>Phone:</strong> {staff.contact_number}</p>
            <p><strong>Address:</strong> {staff.address}</p>
            <p><strong>Class Teacher:</strong> {staff.class_teacher.name}</p>

            <button 
              className="info-button" 
              onClick={() => navigate(`/staff-details/${staff.id}`)}
            >
              More Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffManage;
