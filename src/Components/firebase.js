import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC02BSCqWZvs2o2m4X7WAx0jgUM3LZvQF8",
  authDomain: "floralia-5e66c.firebaseapp.com",
  projectId: "floralia-5e66c",
  storageBucket: "floralia-5e66c.appspot.com",
  messagingSenderId: "683207709223",
  appId: "1:683207709223:web:a9fcdb0ab21d0265c57402",
  measurementId: "G-6NGHNVM461"
};

// Initialize Firebase first
const app = initializeApp(firebaseConfig);
// Then initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export Firebase services and methods
export { 
  auth, 
  googleProvider, 
  db, 
  doc, 
  setDoc, 
  getDoc 
};

// Export Firebase auth methods
export {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
