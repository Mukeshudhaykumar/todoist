import React from 'react';
import '../../styles/tasks/TaskItem.css';
function TaskItem({ task, onToggle }) {
  return (
    <div className="task-item">
      <input 
        type="checkbox" 
        className="checkbox-circle" 
        onClick={onToggle} 
      />
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
    </div>
  );
}

export default TaskItem;
