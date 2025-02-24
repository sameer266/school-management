import React, { useEffect, useState } from "react";
import "../../../style/pages_css/dashboard/staff_css/resultadd.css";
import { 
  Staff_Teaches_Classes, 
  Staff_Get_All_Exam_Results, 
  Staff_Add_Result, 
  Staff_Delete_Result 
} from "../../../api_Data/staff_api";
import toast, { Toaster } from 'react-hot-toast';
import BackButton from "../../../components/BackButton";

function ResultAdd() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newResult, setNewResult] = useState({
    student_id: "",
    exam_id: "",
    subject: "",
    marks_obtained: "",
    total_marks: "",
    grade: "",
    image: null,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await Staff_Teaches_Classes();
        setClasses(data.message);
      } catch (error) {
        toast.error("Error fetching classes.");
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const fetchExamResults = async () => {
        setLoading(true);
        try {
          const data = await Staff_Get_All_Exam_Results(selectedClass);
          setExamResults(data.exams_data);
        } catch (error) {
          toast.error("Error fetching exam results.");
        } finally {
          setLoading(false);
        }
      };
      fetchExamResults();
    }
  }, [selectedClass]);

  const handleAddResult = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      const formData = new FormData();
      formData.append("student_id", newResult.student_id);
      formData.append("exam_id", newResult.exam_id);
      formData.append("subject", newResult.subject);
      formData.append("marks_obtained", newResult.marks_obtained);
      formData.append("total_marks", newResult.total_marks);
      formData.append("grade", newResult.grade);
      if (newResult.image) {
        formData.append("image", newResult.image);
      }

      const response = await Staff_Add_Result(formData);
      setExamResults([...examResults, response]);
      setNewResult({ student_id: "", exam_id: "", subject: "", marks_obtained: "", total_marks: "", grade: "", image: null });
      toast.success("Exam result added successfully.");
    } catch (error) {
      toast.error("Error adding exam result.");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteResult = async (id) => {
    setLoading(true);

    try {
      await Staff_Delete_Result(id);
      setExamResults(examResults.filter((result) => result.id !== id));
      toast.success("Exam result deleted successfully.");
    } catch (error) {
      toast.error("Error deleting exam result.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
     <BackButton/>
     
    <div className="result-add-container">
      <h2>Manage Exam Results</h2>
      <div className="select-class-container">
        <label>Select Class:</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div className="table-container">
        {loading ? (
          <p>Loading results...</p>
        ) : examResults.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Exam Name</th>
                <th>Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.student_id}</td>
                  <td>{result.exam_name}</td>
                  <td>{result.marks_obtained}</td>
                  <td>{result.total_marks}</td>
                  <td>{result.grade}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteResult(result.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          selectedClass && <p>No exam results found for this class.</p>
        )}
      </div>
      <h3>Add Exam Result</h3>
      <form className="add-result-form" onSubmit={handleAddResult}>
        <input type="text" placeholder="Student ID" value={newResult.student_id} onChange={(e) => setNewResult({ ...newResult, student_id: e.target.value })} required />
        <input type="text" placeholder="Exam ID" value={newResult.exam_id} onChange={(e) => setNewResult({ ...newResult, exam_id: e.target.value })} required />
        <input type="text" placeholder="Subject" value={newResult.subject} onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })} required />
        <input type="number" placeholder="Marks Obtained" value={newResult.marks_obtained} onChange={(e) => setNewResult({ ...newResult, marks_obtained: e.target.value })} required />
        <input type="number" placeholder="Total Marks" value={newResult.total_marks} onChange={(e) => setNewResult({ ...newResult, total_marks: e.target.value })} required />
        <input type="text" placeholder="Grade" value={newResult.grade} onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => setNewResult({ ...newResult, image: e.target.files[0] })} />
        <button type="submit" disabled={adding} className="add-btn">
          {adding ? "Adding..." : "Add Result"}
        </button>
      </form>
     
    </div>
    </>
  );
}

export default ResultAdd;
