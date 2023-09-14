import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Nav from "./Component/Nav";

import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";

import EventRetrieval from "./Component/EventRetrieve";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./Component/LogOut";
import TicketBooking from "./Component/TicketBooking";
import UserDashboard from "./Component/UserDashboard";

function App() {
 const  isLoggedIn = localStorage.getItem("userId");


  return (
    <Router>
      <ToastContainer />

      {isLoggedIn ? <Nav /> : null}
      <Routes>
        <Route  path="/"  element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login  />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        {/* Uncomment this route if needed */}
        {/* <Route path="/create-loan" element={isLoggedIn ? <LoanCreation /> : <Navigate to="/login" />} /> */}
        
        <Route path="/event" element={<EventRetrieval />} />
        {/* <Route path="/ticket-book:" element={<TicketBooking />} /> */}
        <Route path="/ticket-book/:_id" element={<TicketBooking />} />

        
        <Route
          path="/UserDashboard"
          element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
  );
}

export default App;
