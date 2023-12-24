// Importing necessary Firebase modules
import { initializeApp } from '@firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyD2nfs21EvUbRZfa7MW-Uximm3uKGfeSsA',
  authDomain: 'automata-c9c45.firebaseapp.com',
  projectId: 'automata-c9c45',
  storageBucket: 'automata-c9c45.appspot.com',
  messagingSenderId: '1066269267273',
  appId: '1:1066269267273:web:5696bb1a2ab6abf5bb7698',
  measurementId: process.env.REACT_APP_measurementId,
};

// Initializing Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Exporting the auth object
export const auth = getAuth(app);

// Exporting the GoogleAuthProvider instance
export const provider = new GoogleAuthProvider();

// The following commented code is for signing in with Google and logging out

// Function to sign in with Google
// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider).then(result => {
//       // On successful sign in, storing user's name, email, and profile picture URL in local storage
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;

//       localStorage.setItem('name', name);
//       localStorage.setItem('email', email);
//       localStorage.setItem('profilePic', profilePic);

//   }).catch(error => {
//       // Logging any errors
//       console.log(error);
//   });
// }

// Function to log out
// export const logout = () => {
//   signOut(auth).then(() => {
//     // On successful sign out, removing user's name, email, and profile picture URL from local storage
//     console.log('sign out success')
//     localStorage.removeItem('name');
//     localStorage.removeItem('email');
//     localStorage.removeItem('profilePic');
//   }).catch(error => {
//     // Logging any errors
//     console.log(error)
//   })
// }
