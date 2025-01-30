import React from 'react';
import '../style/pages_css/newsevents.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';


function NewsEvents() {
  // Sample data for news and events
  const newsEvents = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: '2023-11-15',
      time: '10:00 AM',
      location: 'School Ground',
      description: 'Join us for a day full of fun and sports activities. All students and parents are welcome!',
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 2,
      title: 'Science Fair 2023',
      date: '2023-11-20',
      time: '9:00 AM',
      location: 'School Auditorium',
      description: 'Explore innovative projects by our students. Prizes will be awarded for the best projects.',
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2023-11-25',
      time: '2:00 PM',
      location: 'Classrooms',
      description: 'Discuss your child\'s progress with our teachers. All parents are requested to attend.',
      image: 'https://via.placeholder.com/400x200',
    },
  ];

  return (
    <div className="news-events-container">
     
      <h1 className="news-events-header">News & Events</h1>
      <p className="news-events-description">
        Stay updated with the latest news and upcoming events at Sacred Heart Academy.
      </p>

      <div className="news-events-grid">
        {newsEvents.map((item) => (
          <div key={item.id} className="news-event-card">
            <div className="card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card-content">
              <h2 className="card-title">{item.title}</h2>
              <div className="card-details">
                <div className="detail-item">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{item.date}</span>
                </div>
                <div className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>{item.time}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{item.location}</span>
                </div>
              </div>
              <p className="card-description">{item.description}</p>
              <button className="card-button">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsEvents;