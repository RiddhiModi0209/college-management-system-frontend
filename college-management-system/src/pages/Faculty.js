import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Faculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://college-p-backend-express.onrender.com/admin/add-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || "Admin added successfully");
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Branch</label>
          <select className="form-control" name="branch" value={formData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            <option value="Computer">Computer</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Chemical">Chemical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Admin</button>
      </form>
    </div>
  );
};

export default Faculty;
