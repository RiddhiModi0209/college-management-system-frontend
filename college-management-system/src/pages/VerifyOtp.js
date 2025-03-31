import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShieldAlt } from "react-icons/fa";
import "./VerifyOtp.css";

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError("");
  };

  const handleVerify = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("https://college-p-backend-express.onrender.com/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP verified successfully!");
        navigate("/reset-password"); 
      } else {
        setError(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <FaShieldAlt size={50} className="verify-icon" />
        <h3 className="verify-title">Verify your email</h3>
        <p className="verify-text">We have sent an OTP to: <strong>{email}</strong></p>

        <input
          type="text"
          maxLength="6"
          className={`form-control text-center my-2 otp-input ${error ? "is-invalid" : ""}`}
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
        />
        {error && <span className="error-text">{error}</span>}

        <button className="btn verify-btn mt-3" onClick={handleVerify}>
          Verify OTP
        </button>

        <button className="btn btn-link resend-btn">
          Resend OTP
        </button>
        <div className="mt-3">
          <Link to="/Reset" className="text-decoration-none d-flex justify-content-center">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
