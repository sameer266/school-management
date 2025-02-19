import React, { useEffect, useState } from 'react';
import { Staff_Notice } from '../../../api_Data/staff_api';
import '../../../style/pages_css/dashboard/staff_css/noticeStaff.css';
import BackButton from '../../../components/BackButton';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';

function NoticeStaff() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await Staff_Notice();
        if (response?.success) {
          setNotices(response.notices);
        } else {
          setError('No notices found.');
        }
      } catch (err) {
        setError(err.message || 'Error fetching notices.');
      } finally {
        setLoading(false);
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
        
        {loading ? (
          <p>Loading notices...</p>
        ) : (
          <div className="notice-container">
            {notices.length > 0 ? (
              notices.map((notice) => (
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
        )}
      </div>
    </>
  );
}

export default NoticeStaff;