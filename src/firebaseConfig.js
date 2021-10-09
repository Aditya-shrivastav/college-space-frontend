// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUUhVwCMg_q4qN2K0WxL-Rb6OBPvhAmb0",
    authDomain: "college-space-3258c.firebaseapp.com",
    databaseURL: "https://college-space-3258c-default-rtdb.firebaseio.com",
    projectId: "college-space-3258c",
    storageBucket: "college-space-3258c.appspot.com",
    messagingSenderId: "284345413514",
    appId: "1:284345413514:web:1adfb94c4e3ccea90ae273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;