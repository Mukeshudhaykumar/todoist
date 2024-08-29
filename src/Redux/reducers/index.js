// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

export const rootReducer = combineReducers({
  task: taskReducer,
});
