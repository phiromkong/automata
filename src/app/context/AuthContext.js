// Import necessary components and functions from React, Firebase, and react-router-dom
import React, { useContext, createContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import { auth } from 'app/services/cloud_database/FirebaseAuth';
import { useHistory } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();

// Define the AuthContextProvider component
// This component provides authentication functionality to its children
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({}); // State for the current user
  const history = useHistory(); // Hook for accessing the history instance

  // Function for signing in with Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider
    signInWithRedirect(auth, provider); // Sign in with a redirect
  };

  // Function for signing out
  const logOut = () => {
    signOut(auth); // Sign out the current user
  };

  // Effect for handling authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // Update the user state when the authentication state changes
      console.log('user', currentUser); // Log the current user
    });

    // Unsubscribe from authentication state changes when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Run the effect only once on mount

  // Render the provider with the authentication functions and user state as value
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a hook for accessing the authentication context
export const UserAuth = () => {
  return useContext(AuthContext); // Return the current context value
};
