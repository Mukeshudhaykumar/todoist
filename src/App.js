import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/Sidebar/SideBar';
import TaskList from './components/Tasks/TaskList'; // Ensure this path matches your project structure
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/tasklist" element={<TaskList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
