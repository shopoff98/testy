// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAxXrJlh0wmOHGZq_y0L6seH8hY6PjFYMc",
    authDomain: "goit-app-d0c99.firebaseapp.com",
    projectId: "goit-app-d0c99",
    storageBucket: "goit-app-d0c99.appspot.com",
    messagingSenderId: "1057747881513",
    appId: "1:1057747881513:web:60d83c712ee160b8e6d638"
})


// const firebaseConfig = {
//     apiKey: "AIzaSyAxXrJlh0wmOHGZq_y0L6seH8hY6PjFYMc",
//     authDomain: "goit-app-d0c99.firebaseapp.com",
//     projectId: "goit-app-d0c99",
//     storageBucket: "goit-app-d0c99.appspot.com",
//     messagingSenderId: "1057747881513",
//     appId: "1:1057747881513:web:60d83c712ee160b8e6d638"
// };

// Initialize Firebase
// const Firebase = initializeApp(firebaseConfig);


export const auth = getAuth(firebaseApp);
// export default Firebase;

export const singUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential)
    } catch (error) {
        console.log(error)
    }

}