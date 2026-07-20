import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTnU3ndZ6EedROwGSgM2uE6Tbh4wFBkBo",
  authDomain: "girija-clinic.firebaseapp.com",
  projectId: "girija-clinic",
  messagingSenderId: "997721608901",
  appId: "1:997721608901:web:d835898154a141d76a56ac"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);