// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfsiQnOBPxGwKtaCLCMF51p78_53xZJ5Q",
  authDomain: "router-2c954.firebaseapp.com",
  projectId: "router-2c954",
  storageBucket: "router-2c954.firebasestorage.app",
  messagingSenderId: "931883925038",
  appId: "1:931883925038:web:496e1278ba871865b5e9bf",
  measurementId: "G-ZM19LNPPFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
