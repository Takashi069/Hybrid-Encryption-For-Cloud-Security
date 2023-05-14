// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4oUL_ddzhcLbaYqGomfLXBWXJ3GhqvWw",
  authDomain: "cloud-project-b6645.firebaseapp.com",
  projectId: "cloud-project-b6645",
  storageBucket: "cloud-project-b6645.appspot.com",
  messagingSenderId: "714679084948",
  appId: "1:714679084948:web:d8e45b59b86f112a9ad181"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;
