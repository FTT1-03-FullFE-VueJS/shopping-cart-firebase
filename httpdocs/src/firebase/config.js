// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI4O-dpLhZ0krbYhT4_coF_YELI8-m3j4",
  authDomain: "nhan-blog.firebaseapp.com",
  projectId: "nhan-blog",
  storageBucket: "nhan-blog.appspot.com",
  messagingSenderId: "603106055188",
  appId: "1:603106055188:web:2cdc55fa0e397b26528301",
  measurementId: "G-KVJWFKRQNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

export default app;
