import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import Settings from './components/Settings';
import Calendar from './components/Calendar';
import Registration from './components/Registration';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [user, setUser] = useState();
  const [userSettings, setUserSettings] = useState();
  const [showRegistration, setShowRegistration] = useState(false);

  const API_BASE_URL = 'https://zavrsni-back.herokuapp.com';
  // const API_BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/task`, { mode: 'cors' });
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error('Neuspjesno hvatanje zadataka:', error);
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
      console.log('Zadatak izbrisan');
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Greska prilikom brisanja zadatka:', error);
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
        setUser(user);
        console.log('Prijavljen kao:', user);
        console.log(tasks);
        setIsAuthenticated(true);
        setLoginError(false);
        setShowTasks(true); // Show tasks after successful login
        async function fetchSettings() {
          try {
            const response = await fetch(`${API_BASE_URL}/api/v1/account/settings/${user.id}`, { mode: 'cors' });
            const data = await response.json();
            console.log(data);
            setUserSettings(data);
          } catch (error) {
            console.error('Greska prilikom hvatanja postavki:', error);
          }
        }
        fetchSettings();
      } else {
        setLoginError(true);
        console.error('Nevalidni podaci');
      }
    } catch (error) {
      console.error('Greska prilikom prijavljivanja:', error);
    }
  };

  const handleLogout = () => {
    console.log('Odjavljivanje');
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

  const handleSettingsClick = () => {
    setShowTaskForm(false);
    setShowSettings(true);
    setShowTasks(false);
    setShowCalendar(false);
  };

  const handleTaskFormSubmit = async (taskName, description, dueDate, dueTime, id, priority) => {
    try {
      const task = JSON.stringify({
        taskName: taskName,
        description: description,
        dueDate: dueDate,
        dueTime: dueTime,
        accountId: id,
        priority: priority
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
        console.log('Dodan zadatak:', data);
        setTasks([...tasks, data]);
        setShowTasks(true); // Show task list after adding a new task
      } else {
        console.error('Neuspjesno dodavanje zadatka:', response.status);
      }
    } catch (error) {
      console.error('Greska prilikom dodavanja zadatka:', error);
    }
    setShowTaskForm(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowTasks(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="app-container">
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onAddTask={handleAddTaskClick}
          onHome={handleHomeClick}
          onSettings={handleSettingsClick}
          onCalendar={handleCalendarClick} // Add calendar click handler
        />

        {showTaskForm && (
          <TaskForm onAddTask={handleTaskFormSubmit} accountId={user.id} onCancel={() => setShowTaskForm(false)} />
        )}

        {isAuthenticated && !showSettings && showTasks && (
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} uid={user.id} API_BASE_URL={API_BASE_URL} />
        )}

        {isAuthenticated && showCalendar && (
          <Calendar tasks={tasks} />
        )}

        {!isAuthenticated && !showRegistration && (
          <div>
            <LoginForm onLogin={handleLoginSubmit} onRegist={() => setShowRegistration(true)} loginError={loginError} />
          </div>
        )}

        {!isAuthenticated && showRegistration && (
          <Registration onCancel={() => setShowRegistration(false)} />
        )}

        {isAuthenticated && showSettings && (
          <Settings user={user} userSettings={userSettings} />
        )}
      </div>
    </div>
  );
}

export default App;
