import React from 'react';
import '../styles/Header.css';

function Header({ isAuthenticated, onLogout, onAddTask, onSettings, onHome, onCalendar }) {
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

  const handleCalendarClick = () => {
    onCalendar();
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
            <button className="nav-link" onClick={handleCalendarClick}>Calendar</button>
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
