import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import VerifyOtp from "./pages/VerifyOtp.js";
import ResetPassword from "./pages/ResetPassword.js";  

const App = () => {
  return (
    <Router>
      <Routes> 

        <Route path="/" element={<Login />} />
        <Route path="/backtologin" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/signin" element={<Login />} /> 
        <Route path="/verify-otp" element={<VerifyOtp />} />  
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/reset" element={<ResetPassword />} />  
       
       </Routes>
    </Router> 

  );  
};
  
export default App;
