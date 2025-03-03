import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHod_View_One_Student, AdminHod_Update_Student } from '../../../../api_Data/adminHod_api';
import BackButton from '../../../../components/BackButton';
import toast, { Toaster } from 'react-hot-toast';
import '../../../../style/pages_css/dashboard/adminHod_css/stundentCss/updateStudent.css';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store Student details
  const [StudentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    roll_no: '',
    gender:'',
    class_id: '',
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await AdminHod_View_One_Student(id);
      if (response?.success) {
        setStudentData({
          first_name: response.message.name.first_name,
          last_name: response.message.name.last_name,
          email: response.message.name.username, // Assuming username is email
          phone: response.message.contact_number,
          address: response.message.address,
          roll_no:response.message.roll_no,
          gender:response.message.gender,
          class_id: response.message.class_id.name,


         
        });
      } else {
        toast.error('Failed to load Student details.');
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    setStudentData({ ...StudentData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await AdminHod_Update_Student(id, StudentData);
    if (response?.success) {
      toast.success('Student updated successfully!');
      navigate(`/Student/${id}`);
    } else {
      toast.error('Failed to update Student.');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <BackButton />
      
      <div className="update-Student-container">
        <h1>Update Student</h1>
        <form onSubmit={handleSubmit} className="update-Student-form">
          <label>First Name:</label>
          <input type="text" name="first_name" value={StudentData.first_name} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="last_name" value={StudentData.last_name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={StudentData.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={StudentData.phone} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={StudentData.address} onChange={handleChange} required />

            <label>Roll No:</label>
            <input type="number" name="roll_no" value={StudentData.roll_no} onChange={handleChange} required />

        <label> Gender:</label>
        <input type="text" name="gender" value={StudentData.gender}/>

        <label>Class:</label>
        <input type="text" name="class_id" value={StudentData.class_id}/>   

          <button type="submit" className="update-btn">Update Student</button>
        </form>
      </div>
    </>
  );
}

export default UpdateStudent;
