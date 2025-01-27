import React, { useEffect, useState } from 'react';
import { Student_Notice } from '../../../api_Data/student_api';
import '../../../style/pages_css/dashboard/staff_css/noticeStaff.css';
import BackButton from '../../../components/BackButton';
import { FaCheckCircle, FaTimesCircle, FaFilter, FaCalendarAlt } from 'react-icons/fa'; // Icons for status and filter

function NoticeStaff() {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState('');
  const [audience, setAudience] = useState('both'); // Default audience type
  const [filteredNotices, setFilteredNotices] = useState([]);

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await Student_Notice();
        if (response.success) {
          setNotices(response.data);
          setFilteredNotices(response.data); // Initialize filtered notices
        } else {
          setError('Failed to fetch notices. Please try again later.');
        }
      } catch (err) {
        setError('Error fetching notices. Please check your network connection.');
      }
    };
    fetchNotices();
  }, []);

  // Handle audience filter change
  const handleAudienceChange = (e) => {
    const selectedAudience = e.target.value;
    setAudience(selectedAudience);

    // Filter notices based on the selected audience
    const filtered = notices.filter(
      (notice) => notice.audience === selectedAudience || notice.audience === 'both'
    );
    setFilteredNotices(filtered);
  };

  return (
    <>
      <BackButton />

      <div className="notice-page">
        <h2>Notices</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Filter Section */}
        <div className="filter-section">
          <label htmlFor="audience-filter">
            <FaFilter /> Filter by Audience:
          </label>
          <select
            id="audience-filter"
            value={audience}
            onChange={handleAudienceChange}
          >
            <option value="both">Both</option>
            <option value="students">Students</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Notice Container */}
        <div className="notice-container">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <h3>{notice.title}</h3>
                <p>{notice.message}</p>
                {notice.image && (
                  <img
                    src={`http://127.0.0.1:8000${notice.image}`}
                    alt={notice.title}
                    className="notice-image"
                  />
                )}
                <div className="notice-details">
                  <p>
                    <FaCalendarAlt /> <strong>Published Date:</strong>{' '}
                    {new Date(notice.published_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Audience:</strong> {notice.audience}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    {notice.is_active ? (
                      <span className="active-status">
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span className="inactive-status">
                        <FaTimesCircle /> Inactive
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-notices">No notices available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default NoticeStaff;