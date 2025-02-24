import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import '../../../style/pages_css/dashboard/student_css/result.css'
import BackButton from "../../../components/BackButton";

const sampleResults = [
  { id: 1, student: "John Doe", exam: "Math", marks: 85, total: 100 },
  { id: 2, student: "Jane Smith", exam: "Science", marks: 90, total: 100 },
  { id: 3, student: "Michael Lee", exam: "English", marks: 78, total: 100 },
];

function Result() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = sampleResults.filter((result) =>
    result.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <BackButton/>
    
    <div className="result-container">
      <h2>Student Exam Results</h2>

      {/* Search Bar */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results Table */}
      <div className="table-container">
        {filteredResults.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Marks</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.student}</td>
                  <td>{result.exam}</td>
                  <td>{result.marks}</td>
                  <td>{result.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Result;
