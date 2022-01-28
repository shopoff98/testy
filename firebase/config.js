// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBaaRD16n5LmGdzk1pmgvMkcp-4ZNNnU6w",
    authDomain: "rn-project-d1d6b.firebaseapp.com",
    databaseURL: "https://rn-project-d1d6b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rn-project-d1d6b",
    storageBucket: "rn-project-d1d6b.appspot.com",
    messagingSenderId: "29359416787",
    appId: "1:29359416787:web:f065384ef0b20d137efb26"
})

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

