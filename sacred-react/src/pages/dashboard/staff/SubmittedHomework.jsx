import React, { useEffect, useState } from 'react';
import { Staff_Submitted_HomeworkList, Staff_Check_Homework } from '../../../api_Data/staff_api';
import toast, { Toaster } from 'react-hot-toast';
import BackButton from '../../../components/BackButton';
import '../../../style/pages_css/dashboard/staff_css/submitted_hw.css'

function SubmittedHomework() {
  const [homeworklist, setHomeworkList] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // State for filter (all, pending, checked)

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    const fetchHomework = async () => {
      const response = await Staff_Submitted_HomeworkList();
      if (response?.success) {
        setHomeworkList(response.submitted_hw);
      } else {
        notifyError('Failed to fetch homework list');
      }
    };

    fetchHomework();
  }, []);

  const handleStatusUpdate = async (id) => {
    try {
      const response = await Staff_Check_Homework(id);
      if (response?.success) {
        notifySuccess('Homework status updated successfully');
        // Update the local state to reflect the change
        setHomeworkList((prev) =>
          prev.map((hw) =>
            hw.id === id ? { ...hw, status: true } : hw
          )
        );
      } else {
        notifyError('Failed to update homework status');
      }
    } catch (error) {
      notifyError('An error occurred while updating the status');
    }
  };

  // Filter the homework list based on the selected status
  const filteredHomeworkList = homeworklist.filter((hw) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return !hw.status;
    if (filterStatus === 'checked') return hw.status;
    return true; // Default case for 'all'
  });

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />
      <div className="submitted-homework-container">
        <h1>Submitted Homework</h1>

        {/* Filter options */}
        <div className="filter-options">
          <button onClick={() => setFilterStatus('all')}>All</button>
          <button onClick={() => setFilterStatus('pending')}>Pending</button>
          <button onClick={() => setFilterStatus('checked')}>Checked</button>
        </div>

        {filteredHomeworkList.length > 0 ? (
          <ul className="homework-list">
            {filteredHomeworkList.map((hw) => (
              <li key={hw.id} className="homework-item">
                <div className="student-info">
                  <h2>
                    {hw.student.name.first_name} {hw.student.name.last_name}
                  </h2>
                  <p>Class: {hw.student.class_id.name}</p>
                  <p>Roll No: {hw.student.roll_no}</p>
                </div>
                <div className="homework-details">
                  <p>
                    <strong>Homework Description:</strong> {hw.homework.description}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {new Date(hw.homework.due_date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Submission Date:</strong> {new Date(hw.submission_date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {hw.status ? 'Checked' : 'Pending'}
                  </p>
                  <a href={`http://127.0.0.1:8000${hw.image}`}>
                    <img
                      src={`http://127.0.0.1:8000${hw.image}`}
                      alt="Homework Submission"
                      className="homework-image"
                    />
                  </a>
                </div>
                {!hw.status && (
                  <button
                    className="check-button"
                    onClick={() => handleStatusUpdate(hw.id)}
                  >
                    Mark as Checked
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No homework submitted yet.</p>
        )}
      </div>
    </>
  );
}

export default SubmittedHomework;
