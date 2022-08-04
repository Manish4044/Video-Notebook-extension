import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNoatTbD3fft0eTXg8hdtdeZJdaQ1cqJY",
  authDomain: "notebook-4c2e3.firebaseapp.com",
  projectId: "notebook-4c2e3",
  storageBucket: "notebook-4c2e3.appspot.com",
  messagingSenderId: "196792441266",
  appId: "1:196792441266:web:40e9e31438690a16b1ecab"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);