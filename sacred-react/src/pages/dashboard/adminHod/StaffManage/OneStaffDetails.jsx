import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHod_View_One_Staff, AdminHod_Delete_Staff, AdminHod_Update_Staff_Image } from '../../../../api_Data/adminHod_api';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChalkboardTeacher, FaBook, FaGraduationCap, FaCalendar, FaSyncAlt, FaEdit, FaTrash, FaPen } from 'react-icons/fa';
import '../../../../style/pages_css/dashboard/adminHod_css/oneStaffDetail.css';
import toast, { Toaster } from 'react-hot-toast';
import BackButton from '../../../../components/BackButton';

function OneStaffDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    const fetchStaffData = async () => {
      const response = await AdminHod_View_One_Staff(id);
      if (response?.success) {
        setStaffData(response.data);
      }
    };
    fetchStaffData();
  }, [id,newImage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const response = await AdminHod_Delete_Staff(id);
      if (response?.success) {
        notifySuccess('Staff deleted successfully!');
        navigate('/manage_staff');
      } else {
        notifyError('Failed to delete staff. Please try again.');
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview
    }
  };

  const handleUpdateImage = async () => {
    if (!newImage) {
      notifyError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);

    const response = await AdminHod_Update_Staff_Image(id, formData);
    if (response?.success) {
      notifySuccess('Image updated successfully!');
      setStaffData((prevData) => ({ ...prevData, image: response.message.image }));
      setPreviewImage(null); // Clear preview after successful upload
    } else {
      notifyError('Failed to update image. Please try again.');
    }
  };

  if (!staffData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />

      <div className="staff-details-container">
        <h1 className="staff-details-title">Staff Details</h1>

        <div className="staff-card">
          <h2 className="staff-name">
            <FaUserCircle /> {staffData.name.first_name} {staffData.name.last_name || ''}
          </h2>

          <div className="staff-image-container">
            <img
              src={previewImage || `http://localhost:8000/${staffData.image}`} // Use preview if available
              alt="Staff"
              className="staff-image"
            />
            <label htmlFor="image-upload" className="image-update-icon">
              <FaPen />
            </label>
            <input
              type="file"
              id="image-upload"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <button className="update-image-btn" onClick={handleUpdateImage}>
              Update Image
            </button>
          </div>

          <div className="staff-info">
            <p><FaEnvelope /> <strong>Email:</strong> {staffData.name.username}</p>
            <p><FaPhone /> <strong>Phone:</strong> {staffData.contact_number}</p>
            <p><FaMapMarkerAlt /> <strong>Address:</strong> {staffData.address}</p>
            <p><FaChalkboardTeacher /> <strong>Class Teacher:</strong> {staffData.class_teacher.name}</p>
            <p><FaBook /> <strong>Subject Teaches:</strong> {staffData.subject_teaches.subject_name}</p>

            <div>
              <strong><FaGraduationCap /> Teaches Classes:</strong>
              <ul className="teaches-classes">
                {staffData.teaches_classes.map((classId, index) => (
                  <li key={index}>Class: {classId.name}</li>
                ))}
              </ul>
            </div>

            <p><FaCalendar /> <strong>Joined At:</strong> {new Date(staffData.created_at).toLocaleString()}</p>
            <p><FaSyncAlt /> <strong>Updated At:</strong> {new Date(staffData.updated_at).toLocaleString()}</p>
          </div>

          <div className="button-group">
            <button className="update-btn" onClick={() => navigate(`/update-staff/${id}`)}>
              <FaEdit /> Update Details
            </button>
            <button className="delete-btn" onClick={() => handleDelete(staffData.id)}>
              <FaTrash /> Delete Staff
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneStaffDetails;
