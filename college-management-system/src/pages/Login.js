import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css";
import picture1 from '../Assets/login.png';
import Cookies from "js-cookie";
import { FaGraduationCap } from "react-icons/fa";


// const iconStylelogin = { color: '#005877' };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);


    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("https://college-p-backend-express.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {

        Cookies.set("authToken", data.token, { path: "/", secure: true, sameSite: "Strict" });

        navigate("/dashboard");
      } else {
        setApiError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setApiError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <img src={picture1} alt="College" className="college-image" />
      </div>

      <div className="right-panel">
        <div className="login-box">
          <div className="logo-container1 mb-3 d-flex justify-content-center">
            <div className="logo-circle1 d-flex align-items-center justify-content-center">
              <FaGraduationCap className="icon text-primary" size={50} />
            </div>
          </div>
          <h2 className="fw-bold">Welcome back</h2>
          <p>Please sign in to your account</p>

          {apiError && <span className="error-message">{apiError}</span>}

          <form onSubmit={handleSubmit}>
            <label className="font-style-normal">Email address</label>
            <input className="fw-bold"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

            <label className="font-style-normal">Password</label>
            <input className="fw-bold"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}

            <div className="options">
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>



            <button className="loginsubmit" type="submit">Sign in</button>
            <p className="text-center">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
