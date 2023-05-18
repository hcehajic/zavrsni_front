import React, { useState } from 'react';
import '../styles/LoginForm.css';

function LoginForm({ onSubmit, setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await onSubmit(credentials);
      if (success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <label>
          Username:
          <input type="text" name="username" value={credentials.username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
