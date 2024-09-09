import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { ACCOUNT_INITIALISE, LOGIN, LOGOUT } from '../Redux/logactions/logAction';
import logActReducers from '../Redux/logreducers/logActReducers';
import Loader from '../components/Loader/loader';

const initialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
};

const verifyToken = (token) => {
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const setSession = (token) => {
  if (token) {
    localStorage.setItem('serviceToken', token);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {}
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logActReducers, initialState);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://192.168.1.214:8000/account/login', { username, password });
      const { access_token, user } = response.data;
      setSession(access_token);
      dispatch({ type: LOGIN, payload: { user } });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://192.168.1.213:8000/account/logout');
      setSession(null);
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('serviceToken');
        if (token && verifyToken(token)) {
          setSession(token);
          const response = await axios.get('http://192.168.1.210:8000/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const { user } = response.data;
          dispatch({ type: ACCOUNT_INITIALISE, payload: { isLoggedIn: true, user } });
        } else {
          dispatch({ type: ACCOUNT_INITIALISE, payload: { isLoggedIn: false, user: null } });
        }
      } catch (err) {
        console.error('Initialization error:', err);
        dispatch({ type: ACCOUNT_INITIALISE, payload: { isLoggedIn: false, user: null } });
      }
    };

    init();
  }, []);

  if (!state.isInitialised) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
