import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addTask, removeTask } from '../../Redux/actions/taskActions';
import TaskForm from './TaskForm'; 
import TaskItem from './TaskItem';
import '../../styles/tasks/TaskList.css';

function TaskList() {
  const location = useLocation();
  const { project } = location.state || {};
  const tasks = useSelector((state) => state.task.tasks) || [];
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleRemoveTask = (index) => {
    dispatch(removeTask(index));
  };

  return (
    <div className="task-list">
      <h2>{project ? `${project.name}` : 'Tasks'}</h2>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          task && task.title && task.description ? (
            <TaskItem 
              key={index}
              task={task}
              onToggle={() => handleRemoveTask(index)}  // Remove task when checkbox is checked
            />
          ) : (
            <div key={index} className="task-item">
              <p>Task data is unavailable</p>
            </div>
          )
        ))
      ) : (
        <p>No tasks available.</p>
      )}
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default TaskList;
