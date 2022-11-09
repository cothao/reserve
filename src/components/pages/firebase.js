import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
// import LogIn from "./Login"

const firebaseConfig = {
  apiKey: "AIzaSyDfIFXFmWGcMA9bcXJxQf3Kne2Jy2SvV6s",
  authDomain: "rfp-ge-its.firebaseapp.com",
  projectId: "rfp-ge-its",
  storageBucket: "rfp-ge-its.appspot.com",
  messagingSenderId: "1033345426415",
  appId: "1:1033345426415:web:6bfcb903022ad2f1454c1a",
  measurementId: "G-8T614S1CSG",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password, userObject) => {
  const x = userObject
  console.log(x);
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  logout,
};