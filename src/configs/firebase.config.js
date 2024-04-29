// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjw_hYFsjCV3ZWJkIcb5RN5EsEUvWOmS0",
  authDomain: "capstone-green.firebaseapp.com",
  projectId: "capstone-green",
  storageBucket: "capstone-green.appspot.com",
  messagingSenderId: "164280436120",
  appId: "1:164280436120:web:6c2524f16ea576829797ed",
  measurementId: "G-DJMQT2BQGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);