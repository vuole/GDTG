import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AgreementPage from './pages/AgreementPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          /> */}
          <Route path="agreement" element={<AgreementPage />} />
          <Route path="transaction-history" element={<TransactionHistoryPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
