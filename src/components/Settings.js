import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';
import QRCode from 'react-qr-code';

const Settings = (props) => {
  const [selectedFont, setSelectedFont] = useState(props.userSettings.font);
  const [selectedColorPT, setSelectedColorPT] = useState(props.userSettings.colorOfPriorityTask);
  const [selectedColorNT, setSelectedColorNT] = useState(props.userSettings.colorOfNormalTask);
  const [selectedColorST, setSelectedColorST] = useState(props.userSettings.colorForSubtask);
  const [selectedColorH, setSelectedColorH] = useState(props.userSettings.colorForHeader);
  const [selectedColorBG, setSelectedColorBG] = useState(props.userSettings.colorForBackground);
  const [phoneLoginString] = useState(props.userSettings.phoneLoginString);
  const [qrCodeValue] = useState(props.userSettings.phoneLoginString + '@' + props.user.id);
  const [id] = useState(props.user.id);
  const [dateOfBirth] = useState(props.user.dateOfBirth);
  const [name, setName] = useState(props.user.name);
  const [surname, setSurname] = useState(props.user.surname);
  const [password, setPassword] = useState(props.user.password);
  const [username] = useState(props.user.username);

  const [fontSize, setFontSize] = useState(16); // Initial font size
  const [isEditingFontSize, setIsEditingFontSize] = useState(false);
  const [inputValueFontSize, setInputValueFontSize] = useState(fontSize.toString());

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSurname, setIsEditingSurname] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [nameInput, setNameInput] = useState('');
  const [surnameInput, setSurnameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const API_BASE_URL = 'https://zavrsni-back.herokuapp.com';
  // const API_BASE_URL = 'http://localhost:8080';

  const handleInputChangePhoneCode = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClickPhoneCode = async () => {
    // gotta figure out on server how to activate phone with correct code
    // try {
    //   const response = await fetch(API_BASE_URL + '/api/v1/account/settings/${inputValue}');
    //   const data = await response.json();
    //   setResponse(data);
    // } catch (error) {
    //   console.error('Error making API request:', error);
    // }
  };

  // Handle font selection change
  const handleFontChange = async (event) => {
    const selectedFont = event.target.value;
    try {
      setSelectedFont(selectedFont);
      await axios.put(API_BASE_URL + '/api/v1/account/settings/font/' + props.userSettings.id, { font: selectedFont }); 
    } catch (error) {
      console.error('Error updating font:', error);
    }
  };

  // Handle color selection change
  const handleColorChangePriorityTask = (event) => {
    const selectedColorPT = event.target.value;
    setSelectedColorPT(selectedColorPT);
  };

  // Handle apply button click
  const handleApplyButtonClickPriorityTask = async () => {
    try {
      // Make HTTP POST request to backend API
      await axios.put(API_BASE_URL + '/api/v1/account/settings/priority/' + props.userSettings.id, { priority: selectedColorPT });
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeNormalTask = (event) => {
    const selectedColorNT = event.target.value;
    setSelectedColorNT(selectedColorNT);
  };

  // Handle apply button click
  const handleApplyButtonClickNormalTask = async () => {
    try {
      await axios.put(API_BASE_URL + '/api/v1/account/settings/normal/' +props.userSettings.id, { normal: selectedColorNT });
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeSubTask = (event) => {
    const selectedColorST = event.target.value;
    setSelectedColorST(selectedColorST);
  };

  // Handle apply button click
  const handleApplyButtonClickSubTask = async () => {
    try {
      await axios.put(API_BASE_URL + '/api/v1/account/settings/sub/' + props.userSettings.id, { sub: selectedColorST });
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeHeader = (event) => {
    const selectedColorH = event.target.value;
    setSelectedColorH(selectedColorH);
  };

  // Handle apply button click
  const handleApplyButtonClickHeader = async () => {
    try {
      await axios.put(API_BASE_URL + '/api/v1/account/settings/header/' + props.userSettings.id, { header: selectedColorH });
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const handleColorChangeBackground = (event) => {
    const selectedColorBG = event.target.value;
    setSelectedColorBG(selectedColorBG);
  };

  // Handle apply button click
  const handleApplyButtonClickBackground = async () => {
    try {
      // Make HTTP POST request to backend API
      await axios.put(API_BASE_URL + '/api/v1/account/settings/background/' + props.userSettings.id, { background: selectedColorBG });
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const fontOptions = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Comic Sans MS',
    'Impact',
    'Arial Narrow',
    'Trebuchet MS',
    'Lucida Console',
    'Tahoma',
    'Palatino Linotype',
    'Garamond',
    'MS Sans Serif',
    'MS Serif',
  ];

  const handleEditButtonClickFontSize = () => {
    setIsEditingFontSize(true);
  };

  const handleInputChangeFontSize = (event) => {
    setInputValueFontSize(event.target.value);
  };

  const handleSaveButtonClickFontSize = async () => {
    const newSize = parseInt(inputValueFontSize);

    if (newSize && newSize > 0) {
      setFontSize(newSize);
      try {
        // Make HTTP POST request to backend API
        await axios.put(API_BASE_URL + '/api/v1/account/settings/fontsize/' + props.userSettings.id, { size: newSize });
      } catch (error) {
        console.error('Error updating font size:', error);
      }
    }

    setIsEditingFontSize(false);
  };

  const handleEditButtonClick = (field) => {
    switch (field) {
      case 'name':
        setIsEditingName(true);
        setNameInput(name);
        break;
      case 'surname':
        setIsEditingSurname(true);
        setSurnameInput(surname);
        break;
      case 'password':
        setIsEditingPassword(true);
        setPasswordInput(password);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setNameInput(event.target.value);
        break;
      case 'surname':
        setSurnameInput(event.target.value);
        break;
      case 'password':
        setPasswordInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSaveButtonClick = (field) => {
    switch (field) {
      case 'name':
        setName(nameInput);
        setIsEditingName(false);
        break;
      case 'surname':
        setSurname(surnameInput);
        setIsEditingSurname(false);
        break;
      case 'password':
        setPassword(passwordInput);
        setIsEditingPassword(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="settings-container">
      <div>
        <h2>Postavke profila</h2>
        <div>
          <label htmlFor="name">Ime:</label>
          {!isEditingName ? (
            <span>{name}</span>
          ) : (
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={nameInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('name')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingName && (
            <button onClick={() => handleEditButtonClick('name')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="surname">Prezime:</label>
          {!isEditingSurname ? (
            <span>{surname}</span>
          ) : (
            <div>
              <input
                type="text"
                id="surname"
                name="surname"
                value={surnameInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('surname')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingSurname && (
            <button onClick={() => handleEditButtonClick('surname')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="password">Lozinka:</label>
          {!isEditingPassword ? (
            <span>{password}</span>
          ) : (
            <div>
              <input
                type="text"
                id="password"
                name="password"
                value={passwordInput}
                onChange={handleInputChange}
              />
              <button onClick={() => handleSaveButtonClick('password')}>Sačuvaj</button>
            </div>
          )}
          {!isEditingPassword && (
            <button onClick={() => handleEditButtonClick('password')}>Uredi</button>
          )}
        </div>

        <div>
          <label htmlFor="username">Korisničko ime: {username}</label>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Datum rođenja: {dateOfBirth}</label>
        </div>

      </div>
      <div>
        <h2>Postavke aplikacije</h2>
        <label htmlFor="font-select">Izaberi font:</label>
        <select id="font-select" value={selectedFont} onChange={handleFontChange}>
          {fontOptions.map((font) => (
            <option
              key={font}
              value={font}
              style={{ fontFamily: font }} // Apply font style to the option
            >
              {font}
            </option>
          ))}
        </select>
        <p className="example-text" style={{ fontFamily: selectedFont, fontSize: fontSize }}>
          Primjer teksta u odabranom fontu
        </p>

        <div>
          <label htmlFor="fontSize">Font Size:</label>
          {!isEditingFontSize ? (
            <div>
              <span>{fontSize}px</span>
              <button onClick={handleEditButtonClickFontSize}>Edit</button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                id="fontSize"
                name="fontSize"
                value={inputValueFontSize}
                onChange={handleInputChangeFontSize}
              />
              <button onClick={handleSaveButtonClickFontSize}>Save</button>
            </div>
          )}
        </div>

        <label htmlFor="color-picker">Prioritetni zadaci:</label>
        <input type="color" id="color-picker" value={selectedColorPT} onChange={handleColorChangePriorityTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorPT }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickPriorityTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Normalni zadaci:</label>
        <input type="color" id="color-picker" value={selectedColorNT} onChange={handleColorChangeNormalTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorNT }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickNormalTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Podzadaci:</label>
        <input type="color" id="color-picker" value={selectedColorST} onChange={handleColorChangeSubTask} />
        <div className="color-box" style={{ backgroundColor: selectedColorST }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickSubTask}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Zaglavlje:</label>
        <input type="color" id="color-picker" value={selectedColorH} onChange={handleColorChangeHeader} />
        <div className="color-box" style={{ backgroundColor: selectedColorH }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickHeader}>
          Primijeni
        </button>

        <label htmlFor="color-picker">Pozadina:</label>
        <input type="color" id="color-picker" value={selectedColorBG} onChange={handleColorChangeBackground} />
        <div className="color-box" style={{ backgroundColor: selectedColorBG }}></div>

        <button className="apply-button" onClick={handleApplyButtonClickBackground}>
          Primijeni
        </button>
      </div>
      <div>
        <h2>Prijavljivanje na mobilni uređaj</h2>
        <div>
          <QRCode
              size = {300}
              bgColor = 'white'
              fgColor = 'black'
              value = {phoneLoginString + '@' + id}
            />
        </div>
      </div>
    </div>
  );
};

export default Settings;
