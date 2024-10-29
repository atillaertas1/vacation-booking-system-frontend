import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home"; // HomePage yerine Home kullan
import Profile from "./Pages/Profile";
import VacationForm from "./Pages/VacationForm";
import VacationDetail from './Pages/VacationDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-spot" element={<VacationForm />} />
        <Route path="/vacation/:id" element={<VacationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
