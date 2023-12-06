// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC7zvrSenkANJPZzW54l1qMGQEt3v0dVI",
  authDomain: "react-calculator-88263.firebaseapp.com",
  projectId: "react-calculator-88263",
  storageBucket: "react-calculator-88263.appspot.com",
  messagingSenderId: "806976044368",
  appId: "1:806976044368:web:a36ebd1b27a93c83f00055",
  measurementId: "G-Z9DZPQGRMX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  db,
};
