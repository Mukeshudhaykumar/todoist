import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/sidebar/Sidebar.css';

function SideBar({ onLogout }) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const toggleProjects = () => setIsProjectsOpen(prev => !prev);
  const toggleForm = () => setIsFormOpen(prev => !prev);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (projectName.trim() && workspace.trim()) {
      const newProject = { name: projectName, workspace };
      setProjects(prevProjects => [...prevProjects, newProject]);
      setProjectName('');
      setWorkspace('');
      setIsFormOpen(false);
    }
  };

  const handleProjectClick = (project) => {
    navigate('/tasklist', { state: { project } });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-header-name">Mukesh</h3>
        <div className="sidebar-buttons">
          <button type="button" className="sidebar-head-button">🔔</button>
          <button type="button" className="sidebar-head-button">split</button>
        </div>
      </div>
      <div className="sidebar-header1">
        <button className="add-plus-button">+</button>
        <span className="add-task-btn-name">Add Task</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><span role="img" aria-label="search">🔍</span> <span className="search">Search</span></li>
          <li><span role="img" aria-label="inbox">📥</span> <span className="inbox">Inbox</span></li>
          <li><span role="img" aria-label="today">📅</span> <span className="today">Today</span></li>
          <li><span role="img" aria-label="upcoming">📅</span> <span className="upcoming">Upcoming</span></li>
          <li><span role="img" aria-label="filters-labels">🏷️</span> <span className="filter">Filter & Labels</span></li>
        </ul>
      </nav>
      <div className="sidebar-projects">
        <span>My Projects</span>
        <button onClick={toggleForm} className="add-project-btn">+ Add Project</button>
        <button onClick={toggleProjects} className="dropdown-toggle">
          {isProjectsOpen ? '▼' : '►'}
        </button>
      </div>
      {isProjectsOpen && (
        <ul className="dropdown-menu">
          {projects.map((project, index) => (
            <li key={index} onClick={() => handleProjectClick(project)}>
              {project.name}
            </li>
          ))}
        </ul>
      )}
      {isFormOpen && (
        <form onSubmit={handleAddProject} className="add-project-form">
          <label>
            Name:
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </label>
          <label>
            Workspace:
            <input
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              placeholder="My Project"
            />
          </label>
          <button type="submit" className="submit-project-btn">Add Project</button>
        </form>
      )}
      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
