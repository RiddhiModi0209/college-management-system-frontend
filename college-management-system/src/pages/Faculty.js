import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaLock } from "react-icons/fa"; 
import "../pages/Faculty.css"

const Faculty = () => { 
  return (
    <div className="container">
      <h2 className="fw-bold">Add new administrator to the system</h2>
      <nav className="breadcrumb">
        <span className="breadcrumb-item">Dashboard</span>
        <span className="breadcrumb-item">Administrators</span>
        <span className="breadcrumb-item active">Add New</span>
      </nav>

      <div className="facultycard p-4 bg-light border-0">
        <h5 className="fw-bold">Administrator Details</h5>
        <p className="text-muted">Enter the information for the new administrator account.</p>
      </div>

      <form className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" placeholder="Enter full name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <div className="input-group">
            <input type="email" className="form-control" placeholder="Enter email address" />
            <span className="input-group-text"><FaEnvelope /></span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter phone number" />
            <span className="input-group-text"><FaPhone /></span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input type="password" className="form-control" placeholder="Create a strong password" />
            <span className="input-group-text"><FaLock /></span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <input type="password" className="form-control" placeholder="Confirm password" />
            <span className="input-group-text"><FaLock /></span>
          </div>
        </div>
        <button type="submit" className="bluebtn">Submit</button>
      </form>
    </div>
  );
};

export default Faculty; 