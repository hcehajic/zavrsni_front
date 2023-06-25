import React from 'react';
import { GoogleLogin } from 'react-google-login';

const API_BASE_URL = 'https://zavrsni-back.herokuapp.com';
// const API_BASE_URL = 'http://localhost:8080';

const GoogleLoginButton = (onLogin, setIsAuthenticated) => {
  const responseGoogle = async (response) => {
    try {
      if (response.error) {
        // Handle error
        console.log(response);
        console.log('Google login error:', response.error);
      } else {
        // Get user data from the response
        const { profileObj } = response;
        const email = profileObj.email;
        const password = profileObj.googleId;

        const checkUserResponse = await fetch(`${API_BASE_URL}/api/v1/accounts/${email}/${password}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });

        if (checkUserResponse.ok) {
          console.log('Korisnik postoji, prijavljivanje...');
          const success = await onLogin({ username: email, password: password });
          if (success) {
            setIsAuthenticated(true);
          } else {
            // moram kreirat racun sad jer korisnik ne postoji
          }
        } else {
          // Handle failed API request
          console.log('Check user API request failed');
        }
      }
    } catch (error) {
      console.log('Error occurred:', error);
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
