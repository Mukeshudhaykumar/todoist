import axios from 'axios';

// Function to get the token from local storage
const getAuthFromLocalStorage = () => {
    const auth = localStorage.getItem('serviceToken');
    return auth ? `Bearer ${auth}` : '';
};

// Create axios instance
const axiosServices = axios.create({
    baseURL: 'http://192.168.1.213:8000/api/auth/token', // Base API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the token to headers
axiosServices.interceptors.request.use(
    (config) => {
        const token = getAuthFromLocalStorage();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(
            (error.response && error.response.data) || 'An error occurred'
        );
    }
);

export default axiosServices;
