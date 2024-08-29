import React, { useState } from 'react';
import '../../styles/tasks/TaskForm.css';

function TaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [reminders, setReminders] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      reminders,
    };

    if (title && description) {  // Check if title and description are provided
      onAddTask(newTask);  // Pass the task object to the parent component
      setTitle('');  // Clear form fields after submission
      setDescription('');
      setDueDate('');
      setPriority('');
      setReminders('');
    } else {
      console.error("Task title or description is missing");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-input">
        <input
          type="text"
          placeholder="Task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // Ensure title is required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="task-form-options">
        <input
          type="date"
          placeholder="Due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reminders"
          value={reminders}
          onChange={(e) => setReminders(e.target.value)}
        />
      </div>
      <div className="task-form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-task-bn">
          Add task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
