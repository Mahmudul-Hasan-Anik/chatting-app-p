import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set,push ,onValue,onChildAdded, onChildChanged,child } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyClo3K8bn-EwsMPa1nBF0j5_UqE11OIpoA",
  authDomain: "chit-chat-c390f.firebaseapp.com",
  projectId: "chit-chat-c390f",
  storageBucket: "chit-chat-c390f.appspot.com",
  messagingSenderId: "477862215857",
  appId: "1:477862215857:web:1c7fe43ed40053ea412290"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();


export {auth,createUserWithEmailAndPassword,updateProfile, 
        getDatabase, ref, set,signInWithEmailAndPassword,
        onAuthStateChanged,GoogleAuthProvider,signInWithPopup,
        signOut,push,onValue ,onChildAdded, onChildChanged,child}

