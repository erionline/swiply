import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzIxBuTKV-5uwjge53uB6DgCYdf8hvETM",
  authDomain: "swiply-b9854.firebaseapp.com",
  projectId: "swiply-b9854",
  storageBucket: "swiply-b9854.appspot.com",
  messagingSenderId: "298848378756",
  appId: "1:298848378756:web:b69c90ea23e8c3ea2c87d1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };