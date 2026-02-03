// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6LbIj3LRPYbeoFa3BN3CiUdKGJ8ByM_g",
  authDomain: "login-22955.firebaseapp.com",
  projectId: "login-22955",
  storageBucket: "login-22955.appspot.com",
  messagingSenderId: "221747560271",
  appId: "1:221747560271:web:00c905bb5b55d1504f8f3a"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Trip data to store
const tripData = {
  userEmail: "user@example.com",       // Replace with dynamic user email if needed
  destination: "Paris",
  startDate: "2025-05-10",
  endDate: "2025-05-13"
};

// Save the trip data
async function storeTrip() {
  try {
    const docRef = await addDoc(collection(db, "trips"), tripData);
    console.log("Trip stored with ID:", docRef.id);
  } catch (error) {
    console.error("Error storing trip:", error);
  }
}

// Run the function
storeTrip();
