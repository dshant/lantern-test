// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"; //firebase functions for getAuth, google signin , signup with email & password , sign in
import { getFirestore } from "firebase/firestore"; //firebase database

const firebaseConfig = {
  apiKey: "AIzaSyCC7zvrSenkANJPZzW54l1qMGQEt3v0dVI",
  authDomain: "react-calculator-88263.firebaseapp.com",
  projectId: "react-calculator-88263",
  storageBucket: "react-calculator-88263.appspot.com",
  messagingSenderId: "806976044368",
  appId: "1:806976044368:web:a36ebd1b27a93c83f00055",
  measurementId: "G-Z9DZPQGRMX",
}; //firebase configuration

const app = initializeApp(firebaseConfig); //for initialize the app
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); //googleProvider for signin with google
const db = getFirestore(app); // database for storing data

//exporting the functions for use
export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  db,
};
