import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Settings from './components/Settings';
import Calendar from './components/Calendar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); 

  const API_BASE_URL = 'http://localhost:8080';

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
      const updatedTasks = tasks.filter((task) => task.id !== id);
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
    console.log('Logging out...');
    setIsAuthenticated(false);
    setShowTaskForm(false);
    setShowTasks(false);
    setShowCalendar(false); // Reset calendar visibility on logout
  };

  const handleAddTaskClick = () => {
    setShowTaskForm(true);
    setShowSettings(false);
    setShowTasks(false);
    setShowCalendar(false); // Hide calendar when adding a new task
  };

  const handleHomeClick = () => {
    setShowTaskForm(false);
    setShowSettings(false);
    setShowTasks(true);
    setShowCalendar(false); // Hide calendar when home is clicked
  };

  const handleCalendarClick = () => {
    setShowTaskForm(false);
    setShowSettings(false);
    setShowTasks(false);
    setShowCalendar(true); // Show calendar when calendar is clicked
  };

  const handleTaskFormSubmit = async (taskName, description, dateOfCreation, id) => {
    try {
      const task = JSON.stringify({
        taskName: taskName,
        description: description,
        dateOfCreation: dateOfCreation,
        accountId: id,
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: task
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Task added:', data);
        setTasks([...tasks, data]);
        setShowTasks(true); // Show task list after adding a new task
      } else {
        console.error('Failed to add task:', response.status);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setShowTaskForm(false);
  };

  return (
    <div className="app-container">
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onAddTask={handleAddTaskClick}
          onHome={handleHomeClick}
          onSettings={() => setShowSettings(true)}
          onCalendar={handleCalendarClick} // Add calendar click handler
        />

        {isAuthenticated && !showSettings && (
          <>
            {showTaskForm && <TaskForm onAddTask={handleTaskFormSubmit} accountId={1} />}
            {showTasks && <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} API_BASE_URL={API_BASE_URL} />}
            {showCalendar && <Calendar tasks={tasks} />} 
          </>
        )}

        {!isAuthenticated && (
          <LoginForm
            onSubmit={handleLoginSubmit}
            setIsAuthenticated={setIsAuthenticated}
            loginError={loginError}
          />
        )}

        {isAuthenticated && showSettings && <Settings />}
      </div>
    </div>
  );
}

export default App;
