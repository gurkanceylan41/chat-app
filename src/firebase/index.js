// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjW71NnweyU4OFHrqB_tM9zm5eJ0LbdT0",
  authDomain: "chat-df8f7.firebaseapp.com",
  projectId: "chat-df8f7",
  storageBucket: "chat-df8f7.appspot.com",
  messagingSenderId: "755701015289",
  appId: "1:755701015289:web:942a3f36540e425b883828",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth referansını al
export const auth = getAuth(app);

// Google sağlayıcısını kur
export const provider = new GoogleAuthProvider();

// firestore veritabanının referansını al
export const db = getFirestore(app);
