import {ADD_TASK, REMOVE_TASK} from '../taskactions/taskActions';

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
        tasks: [...state.tasks, action.payload], // Add new task to the array
        isAdded: true,
        // Assuming user info is not relevant for adding tasks here, remove `user` if not needed
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload), // Remove task by index
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
