import React from "react";
import { Link } from "react-router-dom";
import "../style/comp_css/sidebar.css";

const Sidebar = ({links}) => {
  return (
    <div className="sidebar">
    {links.map((link, index) => (
      <Link key={index} to={link.to}>
        {link.label}
      </Link>
    ))}
  </div>
  );
};

export default Sidebar;
