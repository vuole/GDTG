import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AgreementPage from "./pages/AgreementPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: any) => {
    console.log(auth);
    
    if (!auth.currentUser) {
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
