import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

const Registration = ({ onCancel }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [accountData, setAccountData] = useState(null);

  const API_BASE_URL = 'https://zavrsni-back.herokuapp.com';
  // const API_BASE_URL = 'http://localhost:8080';

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/api/v1/accounts/create`, {
        name: name,
        surname: surname,
        password: password,
        dateOfBirth: dateOfBirth
      })
      .then((response) => {
        console.log(response.data);

        setAccountData(response.data);

        setName('');
        setSurname('');
        setPassword('');
        setDateOfBirth('');
        createUserSettings(response.data.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createUserSettings = (accountId) => {
    axios
      .post(`${API_BASE_URL}/api/v1/account/settings/default/${accountId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLoginClick = () => {
    setAccountData(null);
    onCancel();
  };

  if (accountData) {
    return (
      <div className="registration-container">
        <div className="account-created">
          <h2>Kreiran profil:</h2>
          <p>Ime: {accountData.name}</p>
          <p>Prezime: {accountData.surname}</p>
          <p>Datum rođenja: {accountData.dateOfBirth}</p>
          <p>Korisničko ime: {accountData.username}</p>
          <p>Lozinka: {accountData.password}</p>
          <p>*NAPOMENA* Za prijavu koristite Vaše korisničko ime i lozinku!</p>
          <button className="login-button" onClick={handleLoginClick}>Idi na Prijavu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          Ime:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />

        <label>
          Prezime:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </label>
        <br />

        <label>
          Lozinka:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />

        <label>
          Datum rođenja:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </label>
        <br />

        <button type="submit" className="submit-button">Registruj se</button>
      </form>
    </div>
  );
};

export default Registration;
