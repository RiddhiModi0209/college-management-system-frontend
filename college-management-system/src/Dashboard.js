import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Faculty from "./pages/Faculty";
import FacultyList from "./pages/FacultyList";
import Students from "./pages/Students";
import "./Dashboard.css"; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
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