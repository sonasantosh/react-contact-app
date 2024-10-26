// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXAtkDU5lwerjMXfzYYLq7lvCCzeoXQlY",
  authDomain: "contact-app-c587f.firebaseapp.com",
  projectId: "contact-app-c587f",
  storageBucket: "contact-app-c587f.appspot.com",
  messagingSenderId: "93559938903",
  appId: "1:93559938903:web:db07b297e50ea00cfc2812"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)