import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/comp_css/sidebar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ links }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? <FaBars className="toggle-icon" /> : <FaTimes className="toggle-icon" />}
      </button>

      {/* Sidebar Links */}
      <div className="sidebar-links">
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="sidebar-link">
            <span className="sidebar-icon">{link.icon}</span>
            {!isCollapsed && <span className="sidebar-label">{link.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;