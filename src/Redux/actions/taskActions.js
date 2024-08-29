// Action Types
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SET_TASKS = 'SET_TASKS';

// Action Creators

// Action to set tasks (used when fetching tasks)
export const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks,
});

// Action to add a task
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

// Action to remove a task
export const removeTask = (taskId) => ({
    type: REMOVE_TASK,
    payload: taskId,
});
