import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import your reducers
import logActReducers from './logreducers/logActReducers';
import taskReducer from './taskreducers/taskReducer';

// Combine all the reducers into one root reducer
const rootReducer = combineReducers({
  log: logActReducers,  // Assuming `logActReducers` handles log actions
  task: taskReducer     // Assuming `taskReducer` handles task actions
});

// Create the Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))  // Middleware for async actions
);

export default store;
