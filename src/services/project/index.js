import apiService from "../axios";

const API_BASE_URL = "http://192.168.1.108:8000";
// Fetch all tasks from the server
export const getTasks = async (params, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${API_BASE_URL}/tasks`, { params });
        return response.data.data;
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data);
    }
};

// Create a new task on the server
export const createTask = async (taskData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${API_BASE_URL}/tasks/create`, taskData);
        return response.data.data;
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data);
    }
};

// Remove a task from the server by ID
export const deleteTask = async (taskId, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${API_BASE_URL}/tasks/delete/${taskId}`);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data);
    }
};
