import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiUpload, FiFile } from "react-icons/fi"; // Importing icons
import "../../../style/pages_css/dashboard/student_css/hwPage.css"; // Import CSS for styling
import { Student_View_HomeWork, Student_Submit_HomeWork } from "../../../api_Data/student_api"; // Import API functions
import BackButton from "../../../components/BackButton"; // Import BackButton component

function HomeworkPage() {
  // State hooks to manage homework data, submission text, selected homework, and files
  const [homeworks, setHomeworks] = useState([]);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  // ==== Notification ==========
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  // Fetch homework data when the component mounts
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await Student_View_HomeWork(); // API call to fetch homework
        if (response?.success) {
          setHomeworks(response.message); // Update homework state with fetched data
        } else {
          notifyError("Failed to fetch homework.");
        }
      } catch (error) {
        console.error("Error fetching homework:", error);
        notifyError("An error occurred while fetching homework.");
      }
    };
    fetchHomework();
  }, []); // Empty array ensures this effect runs once when the component mounts

  // Handle file selection for submission
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Generate file previews
    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFilePreviews(previews);
  };

  // Handle homework submission
  const handleSubmit = async (homeworkId) => {
    if (selectedFiles.length === 0) {
      notifyError("Please select at least one file to submit.");
      return;
    }

    try {
      const response = await Student_Submit_HomeWork(homeworkId, selectedFiles);

      // Check if submission was successful and reset form states
      if (response.success) {
        notifySuccess("Homework submitted successfully!");
        setSelectedHomework(null);
        setSelectedFiles([]);
        setFilePreviews([]);

        // Update the homework list to reflect submission status
        const updatedHomework = homeworks.map((hw) =>
          hw.id === homeworkId ? { ...hw, isSubmitted: true } : hw
        );
        setHomeworks(updatedHomework);
      } else {
        notifyError("Failed to submit homework.");
      }
    } catch (error) {
      console.error("Error submitting homework:", error);
      notifyError("An error occurred while submitting homework.");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton /> {/* Back button component */}

      <div className="homework-container">
        <h2>Assigned Homework</h2>
        <div className="homework-list">
          {homeworks.map((hw) => (
            <div key={hw.id} className="homework-card">
              <h3>Subject: {hw.subject}</h3>
              <p>{hw.description}</p>
              {hw.image && (
                <img alt="Homework visual" className="homework-image" src={hw.img} />
              )}
              <p><strong>Created:</strong> {new Date(hw.created_at).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(hw.due_date).toLocaleDateString()}</p>

              {/* Display submission status with icons */}
              <div className="submission-status">
                {hw.isSubmitted ? (
                  <span className="submitted">
                    <FiCheckCircle color="green" /> Submitted
                  </span>
                ) : (
                  <span className="not-submitted">
                    <FiXCircle color="red" /> Not Submitted
                  </span>
                )}
              </div>

              {/* Show input form if homework is selected for submission */}
              {selectedHomework === hw.id ? (
                <div className="submission-form">
                  <div className="file-input-container">
                    <label htmlFor="file-upload" className="file-upload-label">
                      <FiUpload className="upload-icon" /> Choose Files
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="file-input"
                      required
                    />
                  </div>

                  {/* File Previews */}
                  {filePreviews.length > 0 && (
                    <div className="file-previews">
                      {filePreviews.map((file, index) => (
                        <div key={index} className="file-preview">
                          <FiFile className="file-icon" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => handleSubmit(hw.id)}
                    className="submit-button"
                    disabled={selectedFiles.length === 0}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                // Show "Submit Homework" button if not yet submitted
                <button
                  onClick={() => setSelectedHomework(hw.id)}
                  className="submit-homework-button"
                  disabled={hw.isSubmitted}
                >
                  Submit Homework
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeworkPage;