import React from 'react';
import { Link } from 'react-router-dom';

import '../style/comp_css/sidebar.css';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="brand-link">
        <img src="logo.png" alt="Logo" className="brand-image img-circle elevation-3" />
        <span className="brand-text font-weight-light">Student Panel</span>
      </div>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="user-avatar.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <span className="d-block">student2</span>
          </div>
        </div>
        <nav>
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-home"></i>
                <p>Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/attendance" className="nav-link">
                <i className="nav-icon fas fa-calendar-check"></i>
                <p>View Attendance</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leave" className="nav-link">
                <i className="nav-icon fas fa-paper-plane"></i>
                <p>Apply for Leave</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link">
                <i className="nav-icon fas fa-comment-alt"></i>
                <p>Feedback Message</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
