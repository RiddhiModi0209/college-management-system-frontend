import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaList, FaUserGraduate } from "react-icons/fa"; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="nav flex-column px-3">
        <li className="nav-item heading"> 
          <h4 className="sidebar-title">EduManage</h4>
        </li>
        <li className="nav-item">
          <Link to="/superadmin/faculty" className="nav-link text-white" onClick={toggleSidebar}>
            <FaChalkboardTeacher className="me-2" /> Faculty
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/superadmin/faculty-list" className="nav-link text-white" onClick={toggleSidebar}>
            <FaList className="me-2" /> Faculty List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/superadmin/students" className="nav-link text-white" onClick={toggleSidebar}>
            <FaUserGraduate className="me-2" /> Students
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
