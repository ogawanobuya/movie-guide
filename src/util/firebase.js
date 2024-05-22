import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2dX1L8GQtMSonGl6DoqXC2-3jEE0Ij04",
  authDomain: "movie-guide-5ece0.firebaseapp.com",
  projectId: "movie-guide-5ece0",
  storageBucket: "movie-guide-5ece0.appspot.com",
  messagingSenderId: "741257054701",
  appId: "1:741257054701:web:de1e5f76c1344cd218ffe4",
  measurementId: "G-7FQJ506LFM"
};
// Firebaseをインスタンス化
const app = initializeApp(firebaseConfig);
// Cloud Firestoreをインスタンス化
export const db = getFirestore();
// Firebase Authenticationをインスタンス化
export const auth = getAuth(app);

export default app;
