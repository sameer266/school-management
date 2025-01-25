import React from "react";
import { Link } from "react-router-dom";
import "../style/comp_css/sidebar.css";

const Sidebar = ({ links }) => {
  return (
    <div className="sidebar">
      {links.map((link, index) => (
        <Link key={index} to={link.to} className="sidebar-link">
          {/* Render the icon and the label */}
          <span className="sidebar-icon">{link.icon}</span>
          <span className="sidebar-label">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
