
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
  authDomain: "merakirana-cc149.firebaseapp.com",
  projectId: "merakirana-cc149",
  storageBucket: "merakirana-cc149.appspot.com",
  messagingSenderId: "553545368898",
  appId: "1:553545368898:web:4717f809503c0defe9f4db"
};


//console.log(process.env.REACT_APP_GOOGLE_APIKEY)
const app = initializeApp(firebaseConfig);
const auth1 = getAuth(app);  // Initialize auth
const provider = new GoogleAuthProvider();  // Initialize Google Auth Provider

export { auth1, provider };