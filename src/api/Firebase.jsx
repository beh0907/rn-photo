import {initializeApp} from 'firebase/app'
// import {FIREBASE_CONFIG} from "../env";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBTsrKg4o27nFhvkM8QAML6R8NqyXVbzz0",
    authDomain: "rn-photo-1c0ab.firebaseapp.com",
    projectId: "rn-photo-1c0ab",
    storageBucket: "rn-photo-1c0ab.appspot.com",
    messagingSenderId: "112502281004",
    appId: "1:112502281004:web:c5d8f7f51c9ee005bc9289"
};

export const initFirebase = () => {
    return initializeApp(FIREBASE_CONFIG)
}
