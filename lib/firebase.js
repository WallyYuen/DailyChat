import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCPU_4VnMvNPHybi8nh7goxeBbICvqCzPk",
  authDomain: "irchat-68568.firebaseapp.com",
  databaseURL: "https://irchat-68568.firebaseio.com",
  projectId: "irchat-68568",
  storageBucket: "irchat-68568.appspot.com",
  messagingSenderId: "185222874408",
  appId: "1:185222874408:web:0fae8f2fd08c5308813c1d",
  measurementId: "G-STVJBX6HMM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth;
const userDb = firebase.database();
const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();

export { auth, userDb, db, now };
