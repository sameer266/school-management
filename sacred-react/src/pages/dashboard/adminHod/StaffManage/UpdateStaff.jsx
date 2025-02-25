import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHod_View_One_Staff, AdminHod_Update_Staff } from '../../../../api_Data/adminHod_api';
import BackButton from '../../../../components/BackButton';
import toast, { Toaster } from 'react-hot-toast';
import '../../../../style/pages_css/dashboard/adminHod_css/updateStaff.css';

function UpdateStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store staff details
  const [staffData, setStaffData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    class_teacher: '',
    class_teaches: [],
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      const response = await AdminHod_View_One_Staff(id);
      if (response?.success) {
        setStaffData({
          first_name: response.data.name.first_name,
          last_name: response.data.name.last_name,
          email: response.data.name.username, // Assuming username is email
          phone: response.data.contact_number,
          address: response.data.address,
          class_teacher: response.data.class_teacher?.id || '',
          class_teaches: response.data.teaches_classes.map(cls => cls.id) || [],
        });
      } else {
        toast.error('Failed to load staff details.');
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleClassTeachesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setStaffData({ ...staffData, class_teaches: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await AdminHod_Update_Staff(id, staffData);
    if (response?.success) {
      toast.success('Staff updated successfully!');
      navigate(`/staff/${id}`);
    } else {
      toast.error('Failed to update staff.');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <BackButton />
      
      <div className="update-staff-container">
        <h1>Update Staff</h1>
        <form onSubmit={handleSubmit} className="update-staff-form">
          <label>First Name:</label>
          <input type="text" name="first_name" value={staffData.first_name} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="last_name" value={staffData.last_name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={staffData.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={staffData.phone} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={staffData.address} onChange={handleChange} required />

          {/* Class Teacher (Single Selection) */}
          <label>Class Teacher:</label>
          <select name="class_teacher" value={staffData.class_teacher} onChange={handleChange} required>
            <option value="">Select Class</option>
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>Class {num + 1}</option>
            ))}
          </select>

          {/* Class Teaches (Multiple Selection) */}
          <label>Class Teaches:</label>
          <select
            name="class_teaches"
            value={staffData.class_teaches}
            onChange={handleClassTeachesChange}
            multiple
            required
          >
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>Class {num + 1}</option>
            ))}
          </select>

          <button type="submit" className="update-btn">Update Staff</button>
        </form>
      </div>
    </>
  );
}

export default UpdateStaff;
