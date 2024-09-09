import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/tasks/TaskForm.css';

function TaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [reminders, setReminders] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Title and description are required!');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      reminders,
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setReminders('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-input">
        <div className="input-group">
          <label htmlFor="title">Task Name</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="task-form-options">
        <div className="input-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="priority">Priority</label>
          <input
            id="priority"
            type="text"
            placeholder="Enter priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="reminders">Reminders</label>
          <input
            id="reminders"
            type="text"
            placeholder="Enter reminders"
            value={reminders}
            onChange={(e) => setReminders(e.target.value)}
          />
        </div>
      </div>
      <div className="task-form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

TaskForm.defaultProps = {
  onCancel: () => {},
};

export default TaskForm;
