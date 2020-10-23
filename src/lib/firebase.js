import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCPU_4VnMvNPHybi8nh7goxeBbICvqCzPk",
  authDomain: "irchat-68568.firebaseapp.com",
  projectId: "irchat-68568",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore();
