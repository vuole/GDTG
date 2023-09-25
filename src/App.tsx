import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AgreementPage from "./pages/AgreementPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import axios from "axios";

function App() {

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
          <Route path="update-profile" element={<UpdateProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
