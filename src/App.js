import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";
import PaymentPage from "./components/PaymentPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
