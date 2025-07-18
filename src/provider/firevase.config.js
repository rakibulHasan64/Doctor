// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4w0qfQRSzKhh_pN-DugAQ-fcV7V4iRSs",
  authDomain: "last-ca29a.firebaseapp.com",
  projectId: "last-ca29a",
  storageBucket: "last-ca29a.firebasestorage.app",
  messagingSenderId: "985163140126",
  appId: "1:985163140126:web:f09c5cb182faa75be5b20f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };


