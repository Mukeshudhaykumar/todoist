// src/utils/session.js

// Store the session token in localStorage
export const setSession = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Remove the session token from localStorage
  export const removeSession = () => {
    localStorage.removeItem('token');
  };
  
  // Retrieve the session token from localStorage
  export const getSession = () => {
    return localStorage.getItem('token');
  };
  
  // Example dispatch function for Redux (if using Redux for state management)
  export const dispatch = (action) => {
    // This is a placeholder. Replace it with actual dispatch logic if you're using Redux.
    console.log('Dispatching action:', action);
  };
  
  // Example action type for login
  export const LOGIN = 'LOGIN';
  