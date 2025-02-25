import React, { useState, useEffect } from 'react';
import { AdminHod_Add_Staff, AdminHod_Get_Classes_And_Subjects } from '../../../../api_Data/adminHod_api'; // API call to add staff
import BackButton from '../../../../components/BackButton'; // Back button component
import toast, { Toaster } from 'react-hot-toast'; // For notifications
import '../../../../style/pages_css/dashboard/adminHod_css/addStaff.css'; // Styling

function AddStaff() {
  const [staffData, setStaffData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    subject_teaches: '',
    class_teacher: '',
    class_teaches: [],
    image: null, // For storing the selected image
    classes: [], // Store classes fetched from API
    subjects: [], // Store subjects fetched from API
  });

  useEffect(() => {
    const fetchClassesAndSubjects = async () => {
      const response = await AdminHod_Get_Classes_And_Subjects();
      console.log(response, "Response from get classes and subjects");
      if (response?.success) {
        setStaffData((prevData) => ({
          ...prevData,
          classes: response.classes, // Set classes data
          subjects: response.subjects, // Set subjects data
        }));
      }
    };
    fetchClassesAndSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClassTeachesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setStaffData({ ...staffData, class_teaches: selectedOptions });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStaffData({ ...staffData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append form fields to FormData
    formData.append('first_name', staffData.first_name);
    formData.append('last_name', staffData.last_name);
    formData.append('email', staffData.email);
    formData.append('phone', staffData.phone);
    formData.append('address', staffData.address);
    formData.append('subject_teaches', staffData.subject_teaches);
    formData.append('class_teacher', staffData.class_teacher);
    formData.append('class_teaches', JSON.stringify(staffData.class_teaches)); // Store as JSON string
    formData.append('image', staffData.image); // Append image

    const response = await AdminHod_Add_Staff(formData);
    if (response?.success) {
      toast.success('Staff added successfully!');
    } else {
      toast.error('Failed to add staff.');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <BackButton />

      <div className="add-staff-container">
        <h1>Add New Staff</h1>
        <form onSubmit={handleSubmit} className="add-staff-form">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={staffData.first_name}
            onChange={handleChange}
            required
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={staffData.last_name}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={staffData.email}
            onChange={handleChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={staffData.phone}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={staffData.address}
            onChange={handleChange}
            required
          />

          <label>Class Teacher:</label>
          <select
            name="class_teacher"
            value={staffData.class_teacher}
            onChange={handleChange}
            required
          >
            <option value="">Select Class Teacher</option>
            {staffData.classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>

          <label>Subject Teaches:</label>
          <select
            name="subject_teaches"
            value={staffData.subject_teaches}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            {staffData.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name}
              </option>
            ))}
          </select>

          <label>Class Teaches:</label>
          <select
            name="class_teaches"
            value={staffData.class_teaches}
            onChange={handleClassTeachesChange}
            multiple
            required
          >
            {staffData.classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>

          {/* Profile Image Upload */}
          <label>Profile Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*" // Restrict to image files
            required
          />

          <button type="submit" className="add-btn">
            Add Staff
          </button>
        </form>
      </div>
    </>
  );
}

export default AddStaff;
