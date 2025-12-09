// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCwUYvBnZxa0fsQGJD1mYIDmiP-hcNbRuI",
  authDomain: "digital-life-lessons-5953a.firebaseapp.com",
  projectId: "digital-life-lessons-5953a",
  storageBucket: "digital-life-lessons-5953a.firebasestorage.app",
  messagingSenderId: "583369132268",
  appId: "1:583369132268:web:db9a7002ca20ecea09bdc9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
