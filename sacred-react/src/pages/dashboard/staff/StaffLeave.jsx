import React, { useState, useEffect } from "react";
import { MdPending, MdCheckCircle } from "react-icons/md";
import BackButton from "../../../components/BackButton";
import {
  Staff_Get_All_Leave_Requests,
  Staff_Apply_Leave,
  Staff_Delete_Leave,
} from "../../../api_Data/staff_api";
import toast, { Toaster } from "react-hot-toast";
import "../../../style/pages_css/dashboard/staff_css/staffLeave.css";

function StaffLeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveMessage, setLeaveMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await Staff_Get_All_Leave_Requests();
      console.log("Response from Get All Leave Requests", response);
      setLeaveRequests(response.leave_requests || []);
    } catch (error) {
      console.error(
        "Error in Getting All Leave Requests",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!leaveMessage || !startDate || !endDate) {
      alert("Please fill all fields!");
      return;
    }

    setSubmitting(true);
    try {
      const response = await Staff_Apply_Leave({
        message: leaveMessage,
        leave_start_date: startDate, // Send date as YYYY-MM-DD format
        leave_end_date: endDate, // Send date as YYYY-MM-DD format
      });

      toast.success("Leave Applied Successfully!");
      fetchLeaveRequests(); // Refresh the leave requests
    } catch (error) {
      alert("Error Applying Leave!");
    } finally {
      setSubmitting(false);
      setLeaveMessage("");
      setStartDate("");
      setEndDate("");
    }
  };

  const handleDeleteLeave = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?"))
      return;

    try {
      const response = await Staff_Delete_Leave(id);
      if (response.success) {
        toast.success("Leave Deleted Successfully!");
        setLeaveRequests((prev) => prev.filter((leave) => leave.id !== id));
      }
    } catch (error) {
      console.error(
        "Error Deleting Leave",
        error?.response?.data?.message || error.message
      );
      toast.error("Error Deleting Leave!");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <BackButton />
      <div className="staff-leave-container">
        <h1 className="title">Leave Requests</h1>

        {/* Leave Request Form */}
        <form className="leave-form" onSubmit={handleApplyLeave}>
          <input
            type="text"
            placeholder="Reason for Leave"
            value={leaveMessage}
            onChange={(e) => setLeaveMessage(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Apply for Leave"}
          </button>
        </form>

        {/* Display Leave Requests */}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : leaveRequests.length === 0 ? (
          <p className="no-data">No leave requests found.</p>
        ) : (
          <div className="leave-list">
            {leaveRequests.map((data) => (
              <div className="leave-card" key={data.id}>
                <div className="card-content">
                  <h5 className="card-title">
                    {data.staff.name.first_name}{" "}
                    {data.staff.name.last_name || ""}
                  </h5>
                  <p>
                    <strong>Reason:</strong> {data.message}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    {data.leave_status === "pending" ? (
                      <span>
                        <MdPending
                          style={{ color: "orange", marginRight: "8px" }}
                        />{" "}
                        Pending
                      </span>
                    ) : data.leave_status === "approved" ? (
                      <span>
                        <MdCheckCircle
                          style={{ color: "green", marginRight: "8px" }}
                        />{" "}
                        Approved
                      </span>
                    ) : (
                      <span>{data.leave_status}</span>
                    )}
                  </p>
                  <p>
                    <strong>From:</strong>{" "}
                    {new Date(data.leave_start_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>To:</strong>{" "}
                    {new Date(data.leave_end_date).toLocaleDateString()}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteLeave(data.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StaffLeave;
