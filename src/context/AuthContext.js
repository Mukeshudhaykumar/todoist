// src/context/AuthContext.js
import React, { useReducer, createContext } from 'react';
import logActReducers from '../reducers/logActReducers';
import { ACCOUNT_INITIALISE,LOGIN,LOGOUT  } from '../Redux/logactions/logAction';

const initialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logActReducers, initialState);

  // Initialize account
  const initialiseAccount = (isLoggedIn, user) => {
    dispatch(ACCOUNT_INITIALISE(isLoggedIn, user));
  };

  // Login action
  const loginUser = (user) => {
    dispatch(LOGIN(user));
  };

  // Logout action
  const logoutUser = () => {
    dispatch(LOGOUT());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        initialiseAccount,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
