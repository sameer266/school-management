import React, { useEffect, useState } from 'react';
import { Student_Notice } from '../../../api_Data/student_api';
import '../../../style/pages_css/dashboard/student_css/noticePage.css';
import BackButton from '../../../components/BackButton';

// Import React Icons
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState('');
  const [audience, setAudience] = useState('both'); // Default audience type

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await Student_Notice();
        if (response.success) {
          console.log(response.data);
          setNotices(response.data);
        } else {
          setError('Failed to fetch notices. Please try again later.');
        }
      } catch (err) {
        setError('Error fetching notices. Please check your network connection.');
      }
    };
    fetchNotices();
  }, []);

  return (
    <>
      <BackButton />

      <div className="notice-page">
        <h2>Notices</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="notice-container">
          {notices.length > 0 ? (
            notices
              .filter((notice) => notice.audience === audience || notice.audience === 'both')
              .map((notice) => (
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
                  <p><strong>Audience:</strong> {notice.audience}</p>
                  <p>
                    <strong>Published Date:</strong>{' '}
                    {new Date(notice.published_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> 
                    {notice.is_active ? (
                      <span style={{ color: 'green' }}>
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        <FaTimesCircle /> Inactive
                      </span>
                    )}
                  </p>
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

export default NoticePage;
