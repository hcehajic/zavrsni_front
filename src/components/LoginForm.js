import React, { useState } from 'react';
import '../styles/LoginForm.css';
import GoogleLoginButton from './GoogleLoginButton';

function LoginForm({ onLogin, setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await onLogin(credentials);
      if (success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage('Nevalidni kredencijali!');
      }
    } catch (error) {
      console.error('Greška prilikom prijave:', error);
      setErrorMessage('Desila se greška prilikom prijave');
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
          Korisničko ime:
          <input type="text" name="username" value={credentials.username} onChange={handleInputChange} />
        </label>
        <label>
          Lozinka:
          <input type="password" name="password" value={credentials.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Login</button>
      </form>
      <div>
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default LoginForm;
