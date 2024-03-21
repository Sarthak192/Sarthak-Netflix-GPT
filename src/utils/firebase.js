import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGyxS5705LPtV-tEzVCwxxq_jEL5IjJqk",
  authDomain: "netflix-gpt-sarthak.firebaseapp.com",
  projectId: "netflix-gpt-sarthak",
  storageBucket: "netflix-gpt-sarthak.appspot.com",
  messagingSenderId: "764060296589",
  appId: "1:764060296589:web:59f746b98d47e7c43489c4"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();