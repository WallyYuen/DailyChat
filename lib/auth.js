import { useState } from "react";
import { auth, db } from "lib/firebase";

export const register = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();

  return auth().signInWithRedirect(provider);
};

export const signInWithGitHub = () => {
  const provider = new auth.GithubAuthProvider();
  
  return auth().signInWithRedirect(provider);
};

export const signInWithMicrosoft = () => {
  const provider = new auth.OAuthProvider("microsoft.com");

  provider.setCustomParameters({
    tenant: process.env.NEXT_PUBLIC_AZURE_TENANT,
  });
  
  return auth().signInWithRedirect(provider);
};

export const logout = () => {
  return auth().signOut();
};
