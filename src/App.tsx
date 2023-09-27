import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AgreementPage from "./pages/AgreementPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import axios from "axios";
import PasswordChangePage from "./pages/PasswordChangePage";

function App() {
  axios.defaults.withCredentials = true;

  const ProtectedRoute = ({ children }: any) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (Object.keys(currentUser).length <= 0) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <TransactionHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="agreement" element={<AgreementPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="password-change" element={<PasswordChangePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
