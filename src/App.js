import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const API_BASE_URL = 'http://localhost:8080';

  // Fetch tasks from API on component mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/task`, { mode: 'cors' });
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {

      const updatedTasks = await tasks.filter((task) => task.id !== id);
      await fetch(`${API_BASE_URL}/api/v1/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Task deleted');
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLoginSubmit = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/${credentials.username}/${credentials.password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Logged in as:', user);
        setIsAuthenticated(true);
        setLoginError(false);
      } else {
        setLoginError(true);
        console.error('Invalid data');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // handle logout and reset authentication state
    console.log('Logging out...');
    setIsAuthenticated(false);
    setShowTaskForm(false);
  };

  const handleAddTaskClick = () => {
    setShowTaskForm(true);
    setShowSettings(false);
  };

  const handleTaskFormSubmit = async (taskName, description, dateOfCreation, id) => {
    try {
      var task = '{"taskName": "'+taskName+'", "description": "'+description+'", "dateOfCreation": "'+dateOfCreation+'", "accountId": '+id+'}';
      console.log(task);
      const response = await fetch(`${API_BASE_URL}/api/v1/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: task
      });
  
      if (response.ok) {
        const data = await response.text();
        const newTask = JSON.parse(data);
        console.log('Task added:', newTask);
        setTasks([...tasks, newTask]);
      } else {
        console.error('Failed to add task:', response.status);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setShowTaskForm(false);
  };   

  const handleHomeClick = () => {
    setShowTaskForm(false);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowTaskForm(false);
  };

  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onAddTask={handleAddTaskClick}
        onHome={handleHomeClick}
        onSettings={handleSettingsClick}
      />

      {isAuthenticated && !showSettings && (
        <>
          {showTaskForm && <TaskForm onAddTask={handleTaskFormSubmit} accountId={1} />}
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        </>
      )}

      {!isAuthenticated && (
        <LoginForm
          onSubmit={handleLoginSubmit}
          setIsAuthenticated={setIsAuthenticated}
          loginError={loginError}
        />
      )}
      {isAuthenticated && showSettings && (
        <Settings />
      )}
    </div>
  );
}

export default App;
