// Import necessary libraries and components
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserAuth } from 'app/context/AuthContext'; // Provide user authentication context
import useShiftKey from 'app/hooks/useShiftKey'; // Custom hook to use shift key
import { useHistory } from 'react-router-dom'; // Hook for routing
import CustomizedDialogs from '../Modal'; // Custom dialog/modal
import { signOut } from 'firebase/auth'; // Firebase signout method
import { auth } from 'app/services/cloud_database/FirebaseAuth'; // Firebase Authentication service

// Defining Props interface. Currently it's empty, but can be filled as per requirement
interface Props {}

const Header = (props: Props) => {
  // useHistory hook to use history instance
  const history = useHistory();

  // Initial state for dialog/modal
  const [open, setOpen] = React.useState<boolean>();

  // Access user and logout (logOut) function from UserAuth context
  const { user, logOut } = UserAuth();

  // Function to handle signOut
  const handleSignOut = () => {
    signOut(auth).then(res => { // Run asynchronous signout method from firebase
      console.log(res);
      history.push('/login'); // Redirect to login page
    });
  };

  // Execute history.push('/') when the shift and 'H' key is pressed
  useShiftKey(() => history.push('/'), 'H');

  // Helper function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: '#fff' }} position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Link to Home */}
          <Link to="/">
            {/* Site title */}
            <Typography variant="h4" sx={{ color: '#5bd9d7' }}>
              Automata<span>.</span>
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* How to use Button to open the instructions dialog/modal */}
            <Button variant="outlined" onClick={handleClickOpen}>
              How to use?
            </Button>
            {/* If user is logged in, show 'Welcome [user name]' and Logout button */}
            {user?.displayName && (
              <Typography
                variant="h6"
                sx={{
                  color: '#000',
                  paddingLeft: '30px',
                }}
              >
                Welcome {user?.displayName}
              </Typography>
            )}
            {user?.displayName && (
              <Button
                sx={{ paddingRight: '30px', paddingLeft: '30px' }}
                onClick={handleSignOut}
              >
                Logout
              </Button>
            )}
            {/* If user is not logged in, show Login link */}
            {!user?.displayName && (
              <Typography
                variant="h6"
                sx={{
                  color: '#000',
                  paddingRight: '30px',
                  paddingLeft: '30px',
                }}
              >
                <Link to="/login">Login</Link>
              </Typography>
            )}
            {/* Github link */}
            <a
              href="https://github.com/Re4ch-Jay/Automata-Web"
              target={'_blank'}
            >
              <Button sx={{ backgroundColor: '#5bd9d7', color: '#000' }}>
                GitHub
              </Button>
            </a>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Custom Dialog/Modal */}
      <CustomizedDialogs open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
