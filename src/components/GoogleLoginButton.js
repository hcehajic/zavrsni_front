import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const responseGoogle = async (response) => {
    // Handle the response from Google login

    console.log(response);

    const { profileObj } = response;
    const email = profileObj.email;
    const password = profileObj.googleId;

    console.log(JSON.stringify({ email }));
    console.log(JSON.stringify({ password }));


    try {
      const checkUserResponse = await fetch(`${API_BASE_URL}/api/v1/accounts/${profileObj.email}/${profileObj.googleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (checkUserResponse.ok) {
        console.log('Korisnik postoji, prijavljivanje...');
        const success = await onLogin(credentials);
        if (success) {
          setIsAuthenticated(true);
        } else {
          setErrorMessage('Nevalidni kredencijali!');
        }
      } else {
        
      }
    } catch (error) {
      console.log('Error occurred:', error);
      // Handle the error
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="675483254430-qvu2dhdfh8blkll8ihn3s0fhk5lftl2n.apps.googleusercontent.com"
        buttonText="Prijavi se sa Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginButton;
