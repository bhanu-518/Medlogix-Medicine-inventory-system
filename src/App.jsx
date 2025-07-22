import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

function AppRoutes({ isAuthenticated, onLogin, onSignup, error, onLogout }) {
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={onLogin} error={error} />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onSignup={onSignup} error={error} />
      } />
      <Route
        path="/dashboard"
        element={
          isAuthenticated
            ? <Dashboard onLogout={onLogout} />
            : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

const mockUser = { email: 'user@example.com', password: 'password', name: 'User' };

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Use mock logic for login
  const handleLogin = ({ email, password }) => {
    if (email === mockUser.email && password === mockUser.password) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  // Use mock logic for signup (accept any signup)
  const handleSignup = ({ name, email, password }) => {
    setIsAuthenticated(true);
    setError("");
  };

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} onSignup={handleSignup} error={error} onLogout={() => setIsAuthenticated(false)} />
    </Router>
  );
};

export default App;





