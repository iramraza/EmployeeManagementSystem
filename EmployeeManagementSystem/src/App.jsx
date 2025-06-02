import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate
} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const NavigationBar = ({ isLoggedIn, handleLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
    <NavLink className="navbar-brand" to="/">EMS</NavLink>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({ color: isActive ? '#28a745' : 'white' })}
              >
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/login"
                style={({ isActive }) => ({ color: isActive ? '#28a745' : 'white' })}
              >
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/dashboard"
                style={({ isActive }) => ({ color: isActive ? '#28a745' : 'white' })}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
);

const AppContent = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    alert('🔓 Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div className="p-4">404 - Page Not Found</div>} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <style>
      {`
        .nav-link:hover {
          color: #28a745 !important;
        }
      `}
    </style>
    <AppContent />
  </Router>
);

export default App;
