import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";
import { FaPaperPlane, FaGraduationCap, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import VerifyOtp from "./VerifyOtp"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false); 

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); 

    try {
      const response = await fetch(
        "https://college-p-backend-express.onrender.com/otp/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {   
        setShowVerifyOtp(true); 
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center">
      {!showVerifyOtp ? (
        <div className="container">
          <div className="row shadow-lg rounded">
            {/* Left Panel */}
            <div className="col-md-6 left-panel1 d-none d-md-flex flex-column align-items-center justify-content-center text-white"></div>

            {/* Right Panel */}
            <div className="col-md-6 bg-white right-panel1 d-flex align-items-center justify-content-center p-4">
              <div className="card p-4 shadow-sm text-center w-100">
                {/* Logo */}
                <div className="logo-container mb-3 d-flex justify-content-center">
                  <div className="logo-circle d-flex align-items-center justify-content-center">
                    <FaGraduationCap className="icon text-primary" size={40} />
                  </div>
                </div>

                {/* Heading */}
                <h2 className="fw-bold fs-3">Forgot Password?</h2>
                <p className="text-muted">Enter your email to receive an OTP.</p>

                {/* Form */}
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold email-text">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-primary">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className={`fw-bold form-control rounded custom-input ${error ? "error-border" : ""}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                      />
                    </div>
                    {error && <span className="error-message">{error}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    <FaPaperPlane className="me-2" /> Send OTP
                  </button>

                  <div className="mt-3">
                    <Link to="/Signin" className="text-decoration-none d-flex justify-content-center">
                      ← Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VerifyOtp email={email} />
      )}
    </div>
  );
};

export default ForgotPassword;
