import { ADD_TASK, REMOVE_TASK } from '../actions/taskActions';

const initialState = {
  tasks: [], // Array to hold the tasks
  user: null, // Holds user information
  isAdded: false, // Flag for task addition
  isRemoved: false, // Flag for task removal
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task], // Add new task to the array
        isAdded: true,
        user: action.payload.user, // Update user information
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task, index) => index !== action.payload.taskId), // Remove task by index
        isRemoved: true,
      };

    case 'AUTH_INITIALIZE':
      return {
        ...state,
        isAdded: action.payload.isAdded,
        isRemoved: action.payload.isRemoved,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default taskReducer;
