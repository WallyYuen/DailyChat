import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCPU_4VnMvNPHybi8nh7goxeBbICvqCzPk",
  authDomain: "irchat-68568.firebaseapp.com",
  databaseURL: "https://irchat-68568.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
