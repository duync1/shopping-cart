// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2aHw_YbjHKkZuofE5tp1OyOeN-4N8QJo",
  authDomain: "shopping-cart-1838c.firebaseapp.com",
  projectId: "shopping-cart-1838c",
  storageBucket: "shopping-cart-1838c.firebasestorage.app",
  messagingSenderId: "27102982572",
  appId: "1:27102982572:web:d3667f8605af5373df4a09",
  measurementId: "G-P445ZQDL6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);