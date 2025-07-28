import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmEjmaNyFbkazqkj9nlbac4I2p6E0QAqE",
  authDomain: "millionaire-game-2a70a.firebaseapp.com",
  projectId: "millionaire-game-2a70a",
  storageBucket: "millionaire-game-2a70a.firebasestorage.app",
  messagingSenderId: "406410266143",
  appId: "1:406410266143:web:ffea90836b49393823b72a",
  measurementId: "G-STGRNZYTGG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
