// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"; // libreria para la Autenticacion

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxqr7z_rO2CFNEywk0rNzqCBw3n1VeepU",
  authDomain: "ecommerce-react-2026.firebaseapp.com",
  projectId: "ecommerce-react-2026",
  storageBucket: "ecommerce-react-2026.firebasestorage.app",
  messagingSenderId: "637888795368",
  appId: "1:637888795368:web:aba9571f1a950b937e2f5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)