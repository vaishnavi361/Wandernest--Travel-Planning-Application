// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6LbIj3LRPYbeoFa3BN3CiUdKGJ8ByM_g",
  authDomain: "login-22955.firebaseapp.com",
  projectId: "login-22955",
  storageBucket: "login-22955.appspot.com",
  messagingSenderId: "221747560271",
  appId: "1:221747560271:web:00c905bb5b55d1504f8f3a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
