import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../style/pages_css/dashboard/student_css/hwPage.css"; // Import the external CSS file
import { Student_View_HomeWork } from "../../../api_Data/student_api";
import BackButton from "../../../components/BackButton";

function HomeworkPage() {
  const [homeworks, setHomeworks] = useState([]); // State to store homework data
  const [submissionText, setSubmissionText] = useState(""); // State to store submission text
  const [selectedHomework, setSelectedHomework] = useState(null); // State to track selected homework
  const [selectedFiles, setSelectedFiles] = useState([]); // State to store selected files

  useEffect(() => {
    // Fetch homework data when the component mounts
    const fetchHomework = async () => {
      try {
        const response = await Student_View_HomeWork();
        if (response?.success) {
          setHomeworks(response.data);
        } else {
          alert("Failed to fetch homework.");
        }
      } catch (error) {
        console.error("Error fetching homework:", error);
      }
    };
    fetchHomework();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (homeworkId) => {
    // Prepare submission data
    const formData = new FormData();
    formData.append("student_id", 1); // Replace with the logged-in student's ID
    formData.append("homework_id", homeworkId);
    formData.append("submission_text", submissionText);
    formData.append("status", "submitted");

    // Append selected files to formData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const response = await axios.post("/api/submit-homework/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Homework submitted successfully!");
        setSubmissionText("");
        setSelectedHomework(null);
        setSelectedFiles([]);
      } else {
        alert("Failed to submit homework.");
      }
    } catch (error) {
      console.error("Error submitting homework:", error);
      alert("An error occurred while submitting.");
    }
  };

  return (
    <>
      <BackButton /> {/* Back button component */}

      <div className="homework-container">
        <h2>Assigned Homework</h2>
        <div>
          {homeworks.map((hw) => (
            <div key={hw.id} className="homework-card">
              <h3>Subject: {hw.subject}</h3>
              <p>{hw.description}</p>
              {hw.image && (
                <img alt="Homework visual" className="homework-image" src={hw.img} />
              )}
              <p>
                <strong>Created:</strong> {new Date(hw.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Due Date:</strong> {new Date(hw.due_date).toLocaleDateString()}
              </p>
              {selectedHomework === hw.id ? (
                <div>
                  <textarea
                    rows="3"
                    placeholder="Write your submission here..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="homework-textarea"
                  ></textarea>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <button
                    onClick={() => handleSubmit(hw.id)}
                    className="submit-button"
                    disabled={!submissionText.trim() && selectedFiles.length === 0}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedHomework(hw.id)}
                  className="submit-homework-button"
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
