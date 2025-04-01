import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Faculty from "./pages/Faculty";
import FacultyList from "./pages/FacultyList";
import Students from "./pages/Students";
import { FaBars } from "react-icons/fa";
import "./Dashboard.css"; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 774);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

 
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 774);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Routes>
          <Route path="faculty" element={<Faculty />} />
          <Route path="faculty-list" element={<FacultyList />} />
          <Route path="students" element={<Students />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
