import * as firebase from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyDH8wI1KbtyVVaeNlhl2o2gtgF6l-BjFNs",
  authDomain: "vietstack-kltn2023.firebaseapp.com",
  projectId: "vietstack-kltn2023",
  storageBucket: "vietstack-kltn2023.appspot.com",
  messagingSenderId: "295876770626",
  appId: "1:295876770626:web:b5d84a6050dd164084a6db",
});
const auth = getAuth(app);
export default auth;
