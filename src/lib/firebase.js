import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCPU_4VnMvNPHybi8nh7goxeBbICvqCzPk",
  authDomain: "irchat-68568.firebaseapp.com",
  projectId: "irchat-68568",
  databaseURL: "https://irchat-68568.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const userDb = firebase.database();
export const db = firebase.firestore();
