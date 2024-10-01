import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyCM-jKUVg4Gpk7jooqLp4XINxyOo0POh5k",
  authDomain: "appmoto-c5d44.firebaseapp.com",
  projectId: "appmoto-c5d44",
  storageBucket: "appmoto-c5d44.appspot.com",
  messagingSenderId: "827724975599",
  appId: "1:827724975599:web:60275ab605edb359b3fa1a",
  measurementId: "G-Y1FF2Q2L3Z"
};


const app = initializeApp(firebaseConfig);
export const firestore= getFirestore(app);