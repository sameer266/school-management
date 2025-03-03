import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AdminHod_View_One_Student,
  AdminHod_Delete_Student,
  AdminHod_Update_Student,
  AdminHod_Update_Student_Image,
} from "../../../../api_Data/adminHod_api";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrash,
  FaEdit,
  FaPen,
} from "react-icons/fa";
import "../../../../style/pages_css/dashboard/adminHod_css/stundentCss/oneStudentDetails.css";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../../../components/BackButton";

function OneStudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await AdminHod_View_One_Student(id);
        if (response?.success) {
          setStudentData(response.message);
        } else {
          notifyError("Failed to fetch student details");
        }
      } catch (error) {
        notifyError("Error fetching student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await AdminHod_Delete_Student(id);
        if (response?.success) {
          notifySuccess("Student deleted successfully!");
          navigate("/manage_students");
        } else {
          notifyError("Failed to delete student.");
        }
      } catch (error) {
        notifyError("Error deleting student.");
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateImage = async (id) => {
    if (!newImage) {
      notifyError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      const response = await AdminHod_Update_Student_Image(id, formData);
      if (response?.success) {
        notifySuccess("Image updated successfully!");
        setStudentData((prevData) => ({
          ...prevData,
          image: response.message.image,
        }));
        setPreviewImage(null);
      } else {
        notifyError("Failed to update image.");
      }
    } catch (error) {
      notifyError("Error updating image.");
    }
  };

  if (loading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (!studentData) {
    return <div className="error">No student data found.</div>;
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />

      <div className="student-details-container">
        <h1 className="student-details-title">Student Details</h1>

        <div className="student-card">
          <h2 className="student-name">
            <FaUserCircle /> {studentData.name.first_name}{" "}
            {studentData.name.last_name}
          </h2>

          <div className="student-image-container">
            <img
              src={
                previewImage ||
                `http://127.0.0.1:8000${studentData.image}`
              }
              alt="Student"
              className="student-image"
            />
            <label htmlFor="image-upload" className="image-update-icon">
              <FaPen />
            </label>
            <input
              type="file"
              id="image-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              className="update-image-btn"
              onClick={()=>handleUpdateImage(studentData.id)}
              disabled={!newImage}
            >
              Update Image
            </button>
          </div>

          <div className="student-info">
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
              <strong>Class:</strong> {studentData.class_id.name}
            </p>
            <p>
              <strong>Roll No:</strong> {studentData.roll_no}
            </p>
            <p>
              <strong>Gender:</strong> {studentData.gender}
            </p>
            <p>
              <strong>Join At:</strong>{" "}
              {new Date(studentData.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(studentData.updated_at).toLocaleString()}
            </p>
          </div>

          <div className="button-group">
            <button
              className="update-btn"
              onClick={() => navigate(`/update-student/${id}`)}
            >
              <FaEdit /> Update Details
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <FaTrash /> Delete Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneStudentDetails;
