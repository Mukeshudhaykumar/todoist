import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { ADD_TASK, REMOVE_TASK } from '../Redux/actions/taskActions';
import { taskReducer } from '../Redux/reducers/taskReducer';

const initialState = {
  isAdded: false,
  isRemoved: false,
  user: null,
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }

  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext({
  ...initialState,
  addTask: () => Promise.resolve(),
  removeTask: () => {},
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://192.168.1.217/api/tasks', task);
      const { access_token, user } = response.data;
      setSession(access_token);
      dispatch({
        type: ADD_TASK,
        payload: { task, user },
      });
    } catch (error) {
      console.error('Task addition failed', error);
    }
  };

  const removeTask = (taskId) => {
    try {
      dispatch({
        type: REMOVE_TASK,
        payload: { taskId },
      });
    } catch (error) {
      console.error('Task removal failed', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('/api/auth/me');
          const { user } = response.data;
          dispatch({
            type: 'AUTH_INITIALIZE',
            payload: {
              isAdded: true,
              isRemoved: false,
              user,
            },
          });
        } else {
          dispatch({
            type: 'AUTH_INITIALIZE',
            payload: {
              isAdded: false,
              isRemoved: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error('Initialization failed', err);
        dispatch({
          type: 'AUTH_INITIALIZE',
          payload: {
            isAdded: false,
            isRemoved: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  return (
    <JWTContext.Provider value={{ ...state, addTask, removeTask }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
