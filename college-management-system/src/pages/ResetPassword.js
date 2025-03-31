import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css"; 

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  
  const validatePassword = (password) => {
    const errors = {};
    if (!password) {
      errors.password = "This field is required";
    } else {
      if (password.length < 6) {
        errors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(password)) {
        errors.password = "Must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(password)) {
        errors.password = "Must contain at least one number";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = "Must contain at least one special character";
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = validatePassword(password);

    if (!confirmPassword) {
      validationErrors.confirmPassword = "This field is required";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch(
        "https://college-p-backend-express.onrender.com/otp/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        setErrors({ apiError: data.message || "Failed to reset password" });
      }
    } catch (err) {
      setErrors({ apiError: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="new-reset-container">
      <div className="new-reset-box">
        <FaLock className="new-reset-icon" />
        <h3 className="new-reset-title">Create New Password</h3>
        <p className="new-reset-text">Please create a strong password</p>

        <form onSubmit={handleSubmit}>
          <div className="new-reset-field">
            <label>New Password</label>
            <div className="new-reset-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="new-reset-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <span
                className="new-reset-eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span className="new-reset-error">{errors.password}</span>}
          </div>

          <div className="new-reset-field">
            <label>Confirm Password</label>
            <div className="new-reset-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="new-reset-input"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
              />
              <span
                className="new-reset-eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <span className="new-reset-error">{errors.confirmPassword}</span>}
          </div>

          <div className="new-reset-requirements">
            <p>Password must contain:</p>
            <ul>
              <li>✔ At least 8 characters</li>
              <li>✔ One uppercase letter</li>
              <li>✔ One number</li>
              <li>✔ One special character</li>
            </ul>
          </div>

          {errors.apiError && <p className="new-reset-error">{errors.apiError}</p>}

          <button type="submit" className="new-reset-button">
            Update Password
          </button>

          <Link to="/formreset" className="new-reset-link">
            ← Back to Login
         </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
