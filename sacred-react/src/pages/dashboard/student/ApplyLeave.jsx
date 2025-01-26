import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import '../../../style/pages_css/dashboard/student_css/applyLeave.css'; // Custom styling
import BackButton from '../../../components/BackButton';
import { Student_Leave_Report, Student_Apply_Leave } from '../../../api_Data/student_api';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa'; // Icons for better UI
import { Sidebar } from 'lucide-react';


function ApplyLeave() {
  // State for form data
  const [formData, setFormData] = useState({
    leave_start_date: '',
    leave_end_date: '',
    leave_message: '',
  });

  // State for student leave data
  const [studentData, setStudentData] = useState([]);

  // Notification function
  const notify = (msg) => toast.success(msg);

  // Fetch student leave data from API
  useEffect(() => {
    const fetchStudentLeaveData = async () => {
      const response = await Student_Leave_Report();
      if (response && response.success) {
        // Extract only the required fields
        const formattedData = response.data.map((item) => ({
          leave_start_date: item.leave_start_date,
          leave_end_date: item.leave_end_date,
          leave_message: item.leave_message,
          leave_status: item.leave_status,
          created_at: item.created_at,
        }));
        setStudentData(formattedData);
      } else {
        console.error('Unexpected response structure:', response);
      }
    };

    fetchStudentLeaveData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Student_Apply_Leave(formData);
    if (response?.success) {
      setTimeout(() => {
        // Reload the page to show saved data (this will call the useEffect hook to fetch new data)
        window.location.reload();
      }, 4000); // 4 seconds delay
      notify("Leave application submitted successfully!");
      setFormData({
        leave_start_date: '',
        leave_end_date: '',
        leave_message: '',
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton/>
      <div className="apply-leave-container">
        <h2 className="apply-leave-title">
          <FaCalendarAlt /> Apply for Leave
        </h2>

        {/* Leave Application Form */}
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">
              <FaCalendarAlt /> Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="leave_start_date"
              value={formData.leave_start_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">
              <FaCalendarAlt /> End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="leave_end_date"
              value={formData.leave_end_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">
              <FaInfoCircle /> Reason for Leave
            </label>
            <textarea
              id="reason"
              name="leave_message"
              value={formData.leave_message}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Apply Leave
            </button>
          </div>
        </form>

        {/* Display student leave report */}
        <div className="student-leave-report">
          <h3>Leave Report</h3>
          {studentData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Apply At</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.leave_start_date}</td>
                    <td>{leave.leave_end_date}</td>
                    <td>{leave.leave_message}</td>
                    <td>
                      {leave.leave_status === 'approved' ? (
                        <span className="status-approved">
                          <FaCheckCircle /> Approved
                        </span>
                      ) : leave.leave_status === 'pending' ? (
                        <span className="status-pending">
                          <FaInfoCircle /> Pending
                        </span>
                      ) : (
                        <span className="status-rejected">
                          <FaTimesCircle /> Rejected
                        </span>
                      )}
                    </td>
                    <td>{new Date(leave.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No leave data available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ApplyLeave;