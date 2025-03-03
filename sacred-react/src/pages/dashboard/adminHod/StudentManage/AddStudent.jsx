import React, { useState, useEffect } from 'react';
import { AdminHod_Add_Student, AdminHod_Get_Classes_And_Subjects } from '../../../../api_Data/adminHod_api'; // API call to add student
import BackButton from '../../../../components/BackButton'; // Back button component
import toast, { Toaster } from 'react-hot-toast'; // For notifications
import '../../../../style/pages_css/dashboard/adminHod_css/stundentCss/addstudent.css'; // Styling


function AddStudent() {
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    roll_no: '',
    gender: '',
    address: '',
    class_id: '',
    image: null, 
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClassesAndSubjects = async () => {
      const response = await AdminHod_Get_Classes_And_Subjects();
      console.log(response, "Response from get classes and subjects");
      if (response?.success) {
        setClasses(response.classes);
      }
    };
    fetchClassesAndSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStudentData({ ...studentData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });

    const response = await AdminHod_Add_Student(formData);
    if (response?.success) {
      toast.success('Student added successfully!');
      setStudentData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        roll_no: '',
        gender: '',
        address: '',
        class_id: '',
        image: null,
      });
    } else {
      toast.error('Failed to add student.');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <BackButton />

      <div className="add-student-container">
        <h1>Add New Student</h1>
        <form onSubmit={handleSubmit} className="add-student-form">
          <label>First Name:</label>
          <input type="text" name="first_name" value={studentData.first_name} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="last_name" value={studentData.last_name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={studentData.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={studentData.phone} onChange={handleChange} required />

          <label>Roll No:</label>
          <input type="text" name="roll_no" value={studentData.roll_no} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={studentData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Address:</label>
          <input type="text" name="address" value={studentData.address} onChange={handleChange} required />

          <label>Class:</label>
          <select name="class_id" value={studentData.class_id} onChange={handleChange} required>
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>

          {/* Profile Image Upload */}
          <label>Profile Image:</label>
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />

          <button type="submit" className="add-btn">Add Student</button>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
