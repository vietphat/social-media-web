// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDcWc3Sro5xAH-jq5PDBD_wKccUm3tZyo4',
    authDomain: 'social-media-web-1648d.firebaseapp.com',
    projectId: 'ocial-media-web-1648d',
    storageBucket: 'social-media-web-1648d.appspot.com',
    messagingSenderId: '790245910115',
    appId: '1:790245910115:web:5830ad24a78754e7947a56',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
