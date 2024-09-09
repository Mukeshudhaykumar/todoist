import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addTask, removeTask } from '../../Redux/taskactions/taskActions';
import TaskForm from './TaskForm';
import '../../styles/tasks/TaskList.css';

function TaskList() {
  const location = useLocation();
  const { project } = location.state || {};
  const tasks = useSelector(state => state.task.tasks || []);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleRemoveTask = (index) => {
    dispatch(removeTask(index));
  };

  return (
    <div className="task-list">
      <h2>{project ? project.name : 'Tasks'}</h2>
      {tasks.map((task, index) => (
        <div className="task-item" key={index}>
          <input
            type="checkbox"
            id={`task-${index}`}
            className="checkbox-circle"
            onChange={() => handleRemoveTask(index)}
          />
          <label htmlFor={`task-${index}`} className="checkbox-circle-label"></label>
          <div> 
          <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Reminders: {task.reminders}</p>
          </div>
        </div>
      ))}
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default TaskList;