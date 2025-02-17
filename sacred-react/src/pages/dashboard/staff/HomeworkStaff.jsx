import React, { useEffect, useState } from "react";
import "../../../style/pages_css/dashboard/staff_css/hwStaff.css"; // External 
import toast, { Toaster } from 'react-hot-toast';
import { Staff_Total_SubjectTeach, Staff_Add_Homework,Staff_Delete_Homework,Staff_List_Homework } from "../../../api_Data/staff_api";
import { FaPlus, FaTrash } from "react-icons/fa"; // Icons for add and delete
import BackButton from "../../../components/BackButton";

function HomeworkStaff() {
  const [subjects, setSubjects] = useState([]); // Available subjects
  const [homeworkList, setHomeworkList] = useState([]); // Homework list
  const [newHomework, setNewHomework] = useState({
    subject: "",
    description: "",
    image: null,
    dueDate: "",
    class: "", // New state for class selection
  });

  const notifySuccess=(msg)=>toast.success(msg);
  const notifyError=(msg)=>toast.error(msg);

 const fetchHomework= async ()=>{
  const response = await Staff_List_Homework();
  setHomeworkList(response.homework_list)
 }

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await Staff_Total_SubjectTeach();
        if (response.success) {
          setSubjects(response.subject_names || []);
        }
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };
    fetchSubjects();
    fetchHomework();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHomework((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewHomework((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddHomework = async () => {
    const { subject, description, dueDate, image, class: classSelection } = newHomework;
    if (!subject || !description || !dueDate || !classSelection) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("due_date", dueDate);
      formData.append("class_id", classSelection); // Add class to formData
      if (image) formData.append("image", image);

      const response = await Staff_Add_Homework(formData);
      if (response?.success) {
        notifySuccess("Homework Added Successfully")
        setNewHomework({ subject: "", description: "", image: null, dueDate: "", class: "" });
      } else {
        notifyError("Failed to add homework");
      }
    } catch (error) {
      console.error("Error adding homework", error);
      notifyError("An error occurred while adding homework.");
    }
  };

  const handleDeleteHomework = async (id) => {
    const response= await Staff_Delete_Homework(id);
    if (response?.success){
      notifySuccess("Homework Deleted Successfully")
      window.location.reload();

    } 
    else{
      notifyError("Error in Deleting Homework ")
    }
   
  };

  return (
    <>
     <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />
      <div className="add-homework-page">
        <h1>Add Homework</h1>

        <div className="add-homework-form">
          <h2>Add New Homework</h2>

          <div className="form-group">
            <label>Subject</label>
            <select name="subject" value={newHomework.subject} onChange={handleInputChange}>
              <option value="">-- Select Subject --</option>
             
                <option value={subjects}>
                  {subjects}
                </option>
            
            </select>
          </div>

          <div className="form-group">
            <label>Class</label>
            <select name="class" value={newHomework.class} onChange={handleInputChange}>
              <option value="">-- Select Class --</option>
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Class {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newHomework.description}
              onChange={handleInputChange}
              placeholder="Enter homework description"
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={newHomework.dueDate} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </div>

          <button className="add-button" onClick={handleAddHomework}>
            <FaPlus /> Add Homework
          </button>
        </div>

        <div className="homework-list">
          <h2>Homework List</h2>
          {homeworkList.length === 0 ? (
            <p>No homework added yet.</p>
          ) : (
            homeworkList.map((hw) => (
              <div key={hw.id} className="homework-item">
                <div className="homework-details">
                  <p>{hw.description}</p>
                  <p>
                    <strong>Subject:</strong> {hw.subject}
                  </p>
                  <p>
                    <strong>Class:</strong> {hw.class_id.name}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {new Date(hw.due_date).toLocaleString()}
                  </p>
                  {hw.image && <img src={`http://127.0.0.1:8000/${hw.image}`} alt="Homework" className="homework-image" />}
                </div>
                <button className="delete-button" onClick={() => handleDeleteHomework(hw.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default HomeworkStaff;
