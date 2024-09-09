import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useauth';
const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Render the children if authenticated
};

export default AuthGuard;
