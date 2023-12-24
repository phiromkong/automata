// Importing necessary Firebase modules and process
import { FirebaseApp, initializeApp } from 'firebase/app';
import process from 'process';

// Defining a class FirebaseConfig
class FirebaseConfig {
  // Static property to hold the FirebaseApp instance
  static instance: FirebaseApp;

  // Static method to initialize the FirebaseApp instance
  static initialize() {
    // Firebase configuration object
    const firebaseConfig = {
      apiKey: "AIzaSyD2nfs21EvUbRZfa7MW-Uximm3uKGfeSsA",
      authDomain: "automata-c9c45.firebaseapp.com",
      projectId: "automata-c9c45",
      storageBucket: "automata-c9c45.appspot.com",
      messagingSenderId: "1066269267273",
      appId: "1:1066269267273:web:5696bb1a2ab6abf5bb7698",
      measurementId: process.env.REACT_APP_measurementId,
    };

    // Initializing the FirebaseApp instance with the configuration
    this.instance = initializeApp(firebaseConfig);
  }
}

// Calling the initialize method to initialize the FirebaseApp instance
FirebaseConfig.initialize();

// Exporting the FirebaseConfig class
export default FirebaseConfig;
