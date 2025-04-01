import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaList, FaUserGraduate, FaBars } from "react-icons/fa";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"; 
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
  
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h4 className="sidebar-title">EduManage</h4>
        <ul className="nav flex-column px-3">
          <li className="nav-item">
            <Link to="/superadmin/faculty" className="nav-link" onClick={toggleSidebar}>
              <FaChalkboardTeacher className="icon" /> Faculty
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/superadmin/faculty-list" className="nav-link" onClick={toggleSidebar}>
              <FaList className="icon" /> Faculty List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/superadmin/students" className="nav-link" onClick={toggleSidebar}>
              <FaUserGraduate className="icon" /> Students
            </Link>
          </li>
        </ul>
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;
