import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaIdBadge } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { BsCalendar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './signup.css';
import signupimg from '../Assets/signup.png';

const iconStyle = { color: '#005877' };

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    year: '',
    semester: '',
    enrollment: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch('https://college-p-backend-express.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! Please log in.' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Signup failed. Try again!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 shadow-lg rounded signup-container">
        {/* Left Panel */}
        <div className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center left-panel2">
          <img src={signupimg} alt="Signup" className="img-fluid signup-image" />
        </div>

        {/* Right Panel */}
        <div className="col-md-7 p-5 right-panel2">
          <div className="text-center mb-4">
            <FaGraduationCap size={50} style={iconStyle} />
            <h2 className="mt-2 fw-bold">EduManage</h2>
          </div>

          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser style={iconStyle} /></span>
              <input type="text" className="form-control" name="name" placeholder="Full Name" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaEnvelope style={iconStyle} /></span>
              <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaLock style={iconStyle} /></span>
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><MdSchool style={iconStyle} /></span>
              <select className="form-control" name="branch" onChange={handleChange} required>
                <option>Select Branch</option>
                <option>Computer</option>
                <option>Mechanical</option>
                <option>Chemical</option>
                <option>Civil</option>
                <option>Electrical</option>
              </select>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="input-group">
                <span className="input-group-text"><BsCalendar style={iconStyle} /></span>
                <select className="form-control" name="year" onChange={handleChange} required>
                  <option>Select Year</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="input-group">
                <span className="input-group-text"><BsCalendar style={iconStyle} /></span>
                <select className="form-control" name="semester" onChange={handleChange} required>
                  <option>Select Semester</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaIdBadge style={iconStyle} /></span>
              <input type="text" className="form-control" name="enrollment" placeholder="Enrollment Number" onChange={handleChange} required />
            </div>
            <button type="submit" className="btnsignup w-100">Create Account</button>
          </form>
          <p className="mt-3 text-center">Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
