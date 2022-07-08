// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtj3lwbOu3deUrYEB3NZFETkVl-1VqecA",
    authDomain: "clothing-store-db-f950f.firebaseapp.com",
    projectId: "clothing-store-db-f950f",
    storageBucket: "clothing-store-db-f950f.appspot.com",
    messagingSenderId: "463330538655",
    appId: "1:463330538655:web:0b4b2ae90625c15576deaa"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})


export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// FireStore Database

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
            catch (error) {
                console.log('error creating user', error.message)
        }
    }

    return userDocRef} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    createUserWithEmailAndPassword(auth, email, password)
}