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


    // try {
    //   // Check if the user exists by making an API call
    //   const checkUserResponse = await fetch('YOUR_API_ENDPOINT/checkUser', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: profileObj.email }),
    //   });

    //   if (checkUserResponse.ok) {
    //     // User exists, perform login
    //     console.log('User exists, perform login');
    //     // Make an API call to perform the login
    //     await fetch('YOUR_API_ENDPOINT/login', {
    //       method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email: profileObj.email, tokenId }),
    //       });
    //       // Handle the successful login
    //     } else {
    //       // User doesn't exist, register a new account
    //       console.log('User does not exist, register new account');
    //       // Make an API call to register a new account
    //       await fetch('YOUR_API_ENDPOINT/register', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email: profileObj.email, tokenId }),
    //       });
    //       // Handle the successful registration
    //     }
    //   } catch (error) {
    //     console.log('Error occurred:', error);
    //     // Handle the error
    //   }
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
