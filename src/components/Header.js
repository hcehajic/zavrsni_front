import React from 'react';
import '../styles/Header.css';

function Header({ isAuthenticated, onLogout, onAddTask, onSettings, onHome }) {
  const handleLogoutClick = () => {
    onLogout();
  };

  const handleAddTaskClick = () => {
    onAddTask();
  };

  const handleSettingsClick = () => {
    onSettings();
  };

  const handleHomeClick = () => {
    onHome();
  };

  return (
    <header className="header">
      <div className="logo">Planner</div>
      {isAuthenticated && (
        <nav className="nav">
          <div className="nav-item">
            <button className="nav-link" onClick={handleAddTaskClick}>Add Task</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleSettingsClick}>Settings</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleHomeClick}>Home</button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={handleLogoutClick}>Logout</button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
