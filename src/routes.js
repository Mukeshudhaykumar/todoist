import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/SideBar'; // Import Sidebar component
import TaskList from './components/Tasks/TaskList'; // Import TaskList component
import AuthGuard from './components/auth/authguestGuards/Authguard'; // Ensure the path is correct
import GuestGuard from './components/auth/authguestGuards/Guestguard';
import LoginForm from './components/auth/LoginForm'; // Ensure the path is correct
const routes = (isLoggedIn, handleLogin) => [
  {
    path: '/login',
    element: (
      <GuestGuard>
        <LoginForm onLogin={handleLogin} />
      </GuestGuard>
    )
  },
  {
    path: '/',
    element: isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />
  },
  {
    path: '/tasks',
    element: (
      <AuthGuard>
        <div className="app-container">
          <Sidebar />
          <TaskList />
        </div>
      </AuthGuard>
    )
  },
  {
    path: '*',
    element: <Navigate to={isLoggedIn ? '/tasks' : '/login'} />
  }
];
export default routes;