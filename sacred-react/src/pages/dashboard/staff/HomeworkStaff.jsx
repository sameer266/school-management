import React, { useState } from "react";
import "../../../style/pages_css/dashboard/staff_css/hwStaff.css"; // External CSS
import { FaPlus, FaTrash } from "react-icons/fa"; // Icons for add and delete

function HomeworkStaff() {
  const [homeworkList, setHomeworkList] = useState([]); // State to store homework list
  const [newHomework, setNewHomework] = useState({
    title: "",
    description: "",
    dueDate: "",
  }); // State for new homework input

  // Handle input change for new homework
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHomework({ ...newHomework, [name]: value });
  };

  // Add new homework to the list
  const handleAddHomework = () => {
    if (newHomework.title && newHomework.description && newHomework.dueDate) {
      setHomeworkList([...homeworkList, { ...newHomework, id: Date.now() }]);
      setNewHomework({ title: "", description: "", dueDate: "" }); // Reset form
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete homework from the list
  const handleDeleteHomework = (id) => {
    setHomeworkList(homeworkList.filter((hw) => hw.id !== id));
  };

  return (
    <div className="add-homework-page">
      <h1>Add Homework</h1>

      {/* Form to add new homework */}
      <div className="add-homework-form">
        <h2>Add New Homework</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newHomework.title}
            onChange={handleInputChange}
            placeholder="Enter homework title"
          />
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
          <input
            type="date"
            name="dueDate"
            value={newHomework.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <button className="add-button" onClick={handleAddHomework}>
          <FaPlus /> Add Homework
        </button>
      </div>

      {/* List of existing homework */}
      <div className="homework-list">
        <h2>Homework List</h2>
        {homeworkList.length === 0 ? (
          <p>No homework added yet.</p>
        ) : (
          homeworkList.map((hw) => (
            <div key={hw.id} className="homework-item">
              <div className="homework-details">
                <h3>{hw.title}</h3>
                <p>{hw.description}</p>
                <p>
                  <strong>Due Date:</strong> {hw.dueDate}
                </p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteHomework(hw.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeworkStaff;