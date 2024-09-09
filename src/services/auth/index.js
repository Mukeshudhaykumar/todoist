// src/services/authServices.js

import apiService from './axios';

// Endpoint for login
export const login = async (data, { rejectWithValue }) => {
    try {
        const response = await apiService.post("http://192.168.1.214:8000/account/login", data);
        return response.data;
    } catch (error) {
        if (!error.response) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue(error.response.data);
    }
};

// Endpoint for fetching user information
export const me = async ({ rejectWithValue }) => {
    try {
        const response = await apiService.get("http://192.168.1.214:8000/auth/me");
        return response.data;
    } catch (error) {
        if (!error.response) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue(error.response.data);
    }
};
