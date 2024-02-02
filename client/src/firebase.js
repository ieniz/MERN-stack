// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-d450f.firebaseapp.com",
  projectId: "mern-d450f",
  storageBucket: "mern-d450f.appspot.com",
  messagingSenderId: "1020586825499",
  appId: "1:1020586825499:web:9e4c37d3d8b6f7593965be",
  measurementId: "G-20PN1VN35D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);