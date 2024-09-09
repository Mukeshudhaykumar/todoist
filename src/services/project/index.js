import apiService from '../axios';

const API_BASE_URL = 'http://192.168.1.214:8000/project'; // Use relative URL for base path
const API_BASE_URL_I = 'http://192.168.1.214:8000/{project_id}'; // Use relative URL for base path

// Fetch all tasks from the server
export const getTasks = async (params, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_BASE_URL_I, { params });
        return response.data.data; // Assuming response data structure is { data: [...] }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
};

// Create a new task on the server
export const createTask = async (taskData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${API_BASE_URL}/${taskData}`, taskData);
        return response.data.data; // Assuming response data structure is { data: { ... } }
    } catch (error) {
        console.error('Error creating task:', error);
        return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
};

// Remove a task from the server by ID
export const deleteTask = async (taskId, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${API_BASE_URL}/${taskId}`);
        return response.data; // Assuming response data structure is { ... }
    } catch (error) {
        console.error('Error deleting task:', error);
        return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
};
