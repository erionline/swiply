// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzIxBuTKV-5uwjge53uB6DgCYdf8hvETM",
  authDomain: "swiply-b9854.firebaseapp.com",
  projectId: "swiply-b9854",
  storageBucket: "swiply-b9854.appspot.com",
  messagingSenderId: "298848378756",
  appId: "1:298848378756:web:b69c90ea23e8c3ea2c87d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };