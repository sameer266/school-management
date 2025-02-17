import React, { useEffect, useState } from "react";
import { Staff_Add_Exam, Staff_Delete_Exam ,Staff_ExamNotice } from "../../../api_Data/staff_api";
import toast, { Toaster } from "react-hot-toast";
import "../../../style/pages_css/dashboard/staff_css/examAdd.css";
import BackButton from "../../../components/BackButton";

function ExamAdd() {
  const [formData, setFormData] = useState({ classId: "", image: null });
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    fetchExamData();
  }, []);

  const fetchExamData = async () => {
    try {
      const response = await Staff_ExamNotice();
      if (response?.success) {
        setExamData(response.exam_data);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("class_id", formData.classId);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await Staff_Add_Exam(formDataToSend);
      if (response?.success) {
        toast.success("Exam Notice added successfully");
        setFormData({ classId: "", image: null });
        fetchExamData();
      } else {
        toast.error("Failed to add exam");
      }
    } catch (error) {
      console.error("Error adding exam:", error);
      toast.error("Error adding exam");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await Staff_Delete_Exam(id);
      if (response?.success) {
        toast.success("Exam Notice deleted successfully");
        setExamData(examData.filter((exam) => exam.id !== id));
      } else {
        toast.error("Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("Error deleting exam");
    }
  };

  return (
    <div className="exam-container">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />

      <div className="container">
        <h2 className="heading">Add Exam</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Class </label>
            <input
              type="text"
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Exam Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <button type="submit" className="button">Add Exam</button>
        </form>
      </div>

      <div className="exam-list">
        <h2 className="heading">Existing Exams</h2>
        <ul>
          {examData.length > 0 ? (
            examData.map((exam) => (
              <li key={exam.id} className="exam-item">
                <div>
                  <p>Class : {exam.class_id}</p>
                  <img src={`http://127.0.0.1:8000/${exam.image}`} alt="Exam" className="exam-image" />
                </div>
                <button onClick={() => handleDelete(exam.id)} className="delete-button">Delete</button>
              </li>
            ))
          ) : (
            <p>No exams available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ExamAdd;
