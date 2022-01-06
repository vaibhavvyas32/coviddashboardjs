import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAB0OoAAibHUBwpGOFIWLvzQvveYmzvsek",
  authDomain: "g-login-b335f.firebaseapp.com",
  projectId: "g-login-b335f",
  storageBucket: "g-login-b335f.appspot.com",
  messagingSenderId: "637023599756",
  appId: "1:637023599756:web:d0dbe390a51c5b98b68fa9",
  measurementId: "G-NN3ZM849GE",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((res) => console.log(res.json()));
};
