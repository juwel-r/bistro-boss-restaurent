// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;



/**
   VITE_apiKey=AIzaSyCF2fdwytASUGQ3gZ56PP6oT3w-AQzgw6U
  VITE_authDomain=bistro-boss-a880b.firebaseapp.com
  VITE_projectId=bistro-boss-a880b
  VITE_storageBucket=bistro-boss-a880b.firebasestorage.app
  VITE_messagingSenderId=1094253085573
  VITE_appId=1:1094253085573:web:e32d51e1b6cf46e8867ae
 */