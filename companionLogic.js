//import { db, collection, addDoc, getDocs } from './firebase.js';
import { db } from './firebase.js';
import { collection, addDoc, getDocs } from "firebase/firestore";

const companionForm = document.getElementById('companionForm');
const tripData = JSON.parse(localStorage.getItem('tripPlan'));

companionForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!tripData) {
    console.error("No trip data found in localStorage.");
    return;
  }

  const formData = new FormData(companionForm);

  const userData = {
    destination: tripData.destination,
    startDate: tripData.startDate,
    endDate: tripData.endDate,
    travelType: tripData.travelType,
    ageGroup: formData.get("ageGroup"),
    interests: formData.get("interests").split(',').map(i => i.trim()),
    languages: formData.get("languages").split(',').map(l => l.trim()),
    travelStyle: Array.from(companionForm.querySelectorAll('input[name="travelStyle"]:checked')).map(el => el.value),
    accommodation: Array.from(companionForm.querySelectorAll('input[name="accommodation"]:checked')).map(el => el.value),
    shareExpenses: !!companionForm.querySelector('input[name="shareExpenses"]:checked'),
    timestamp: Date.now(),
  };

  console.log("Trying to save userData:", userData);

  try {
    const docRef = await addDoc(collection(db, "companions"), userData);
    console.log("Document written with ID:", docRef.id);
  } catch (err) {
    console.error("Firestore write error:", err.message);
    return;
  }

  const allUsersSnap = await getDocs(collection(db, "companions"));
  const matches = matchCompanions(userData, allUsersSnap);

  localStorage.setItem("matches", JSON.stringify(matches));
  window.location.href = "tripplan.html";
});

function matchCompanions(userData, snapshot) {
  const matches = [];

  snapshot.forEach(doc => {
    const other = doc.data();

    if (userData.timestamp === other.timestamp) return; // skip self

    const destinationMatch = userData.destination === other.destination;
    const travelTypeMatch = userData.travelType === other.travelType;
    const ageGroupMatch = userData.ageGroup === other.ageGroup;
    const interestsMatch = overlap(userData.interests, other.interests);
    const languagesMatch = overlap(userData.languages, other.languages) > 0;
    const datesMatch = isDateOverlap(userData.startDate, userData.endDate, other.startDate, other.endDate);

    let score = 0;
    if (destinationMatch) score++;
    if (travelTypeMatch) score++;
    if (ageGroupMatch) score++;
    if (interestsMatch > 0) score += interestsMatch;
    if (languagesMatch) score++;
    if (datesMatch) score++;

    if (score >= 3) {
      matches.push({ ...other, score });
    }
  });

  return matches;
}

function overlap(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return 0;
  return arr1.filter(i => arr2.includes(i)).length;
}

function isDateOverlap(start1, end1, start2, end2) {
  const s1 = new Date(start1), e1 = new Date(end1);
  const s2 = new Date(start2), e2 = new Date(end2);
  return s1 <= e2 && e1 >= s2;
}
