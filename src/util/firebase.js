import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};
// Firebaseをインスタンス化
const app = initializeApp(firebaseConfig);
// Cloud Firestoreをインスタンス化
export const db = getFirestore();
// Firebase Authenticationをインスタンス化
export const auth = getAuth(app);

export default app;
