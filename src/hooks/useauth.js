import { useContext } from 'react';
import axios from 'axios';
import JWTContext from '../context/JWTContext'; // Adjust the path as needed
import { useDispatch } from 'react-redux'; // If using Redux
import { LOGIN } from '../Redux/logactions/logAction';
import { setSession } from '../hooks/utils/session'; // Adjust the path as needed

const API_URL = 'http://192.168.1.214:8000'; // Updated base URL

const useAuth = () => {
  const context = useContext(JWTContext);
  const dispatch = useDispatch();

  if (!context) {
    throw new Error('useAuth must be used within a JWTProvider');
  }

  const { login: contextLogin } = context;

  const login = async (username, password) => {
    try {
      console.log(`Attempting login with username: ${username}`); // Debugging line
      const response = await axios.post(`${API_URL}/account/login`, { username, password });
      const { access_token, user } = response.data;
      console.log('Login successful', response.data); // Debugging line
      setSession(access_token); // Set session with the token
      dispatch({ type: LOGIN, payload: { user } }); // Dispatch login action
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw new Error('Login failed');
    }
  };

  return { ...context, login };
};

export default useAuth;
