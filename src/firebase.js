// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuvUKamRMzDzUFq4t_8Myj9p4hWeEI3bM",
  authDomain: "mas-project-702bd.firebaseapp.com",
  projectId: "mas-project-702bd",
  storageBucket: "mas-project-702bd.firebasestorage.app",
  messagingSenderId: "257967195878",
  appId: "1:257967195878:web:7b9717277f431448f51d27",
  measurementId: "G-5QNDBPTBYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);