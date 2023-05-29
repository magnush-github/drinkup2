import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN8BPdHq2n58YwrTARyHCglvfEmxmF2wA",
  authDomain: "drink-up-44c96.firebaseapp.com",
  projectId: "drink-up-44c96",
  storageBucket: "drink-up-44c96.appspot.com",
  messagingSenderId: "741246487444",
  appId: "1:741246487444:web:e41ccfaf9ca35c27ef5d81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
