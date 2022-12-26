import "./styles.css";
import React, { useContext } from "react";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";

export default function App() {
  const {user} = useContext(AuthContext);
  return (
    
   
      <Router >
          <Routes forceload={true}>
            <Route exact path="/" element = {user? <Home />:<Login />} />
            <Route path="/register" element = {user?<Navigate to ="/" />:<Register />} />
            <Route path="/login" element = {user?<Navigate to ="/" />:<Login />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
      </Router>
  );
}
