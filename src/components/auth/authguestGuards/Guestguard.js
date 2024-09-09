import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useauth';// Ensure this path is correct

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth
  const location = useLocation();

  if (isLoggedIn) {
    // Redirect to a default route if already authenticated
    return <Navigate to="/tasks" state={{ from: location }} replace />;
  }

  return children; // Render the children if not authenticated
};

export default GuestGuard;
