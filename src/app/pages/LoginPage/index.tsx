import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Box, Button, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { signInWithPopup } from '@firebase/auth';
import { auth, provider } from 'app/services/cloud_database/FirebaseAuth';
// Defining a functional component named LoginPage
export default function LoginPage() {

  // Using useHistory hook from react-router-dom to get historical data
  const history = useHistory();

  // This function handles Google Sign-In
  const handleGoogleSignIn = () => {
    // Calling signInWithPopup method from Firebase auth, passing in our auth and provider
    signInWithPopup(auth, provider).then(res => {
      console.log(res); // Logs the response on successful signing in
      history.push('/'); // Redirects the user to the home ('/') on successful signing in
    });
  };

  // LoginPage component UI elements 
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: 'center', marginBottom: '10px' }}
        >
          Welcome to Automata Web application!
        </Typography>
        <Typography sx={{ margin: '10px' }}>
          You must have a <strong> google account</strong> to use this website
        </Typography>
        <Typography sx={{ margin: '10px' }}>
          This project is prepare for <strong>Dr. Dona Valy</strong> -
          Researcher at <strong> Cambodia Academy of Digital Technology</strong>
        </Typography>
        <div style={{ margin: '80px' }}>
          <GoogleButton onClick={handleGoogleSignIn} />  {/*Google sign-in button, which calls handleGoogleSignIn when clicked*/}
        </div>
      </Box>
    </Container>
  );
}
