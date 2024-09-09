import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/Sidebar/SideBar';
import routes from './routes'; // Import the routes configuration
import LoginForm from './components/auth/LoginForm'; // Import the LoginForm component
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [redirectTo, setRedirectTo] = useState(null); // Add state for redirection

  const handleLogin = (token) => {
    console.log('Setting token:', token);
    localStorage.setItem('token', token);
    setToken(token);
    setRedirectTo('/tasks'); // Set redirection path after login
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setToken(null);
    setRedirectTo('/login'); // Set redirection path after logout
  };

  const isLoggedIn = !!token; // Convert token to a boolean value

  return (
    <Router>
      {redirectTo && <Navigate to={redirectTo} />} {/* Handle redirection */}
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/tasks" />
            )
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <div className="app-container">
                <SideBar onLogout={handleLogout} />
                <div className="content">
                  <Routes>
                    {routes(isLoggedIn, handleLogin).map((route, index) => (
                      <Route key={index} path={route.path} element={route.element} />
                    ))}
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
