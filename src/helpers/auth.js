import { auth } from "../lib/firebase";

export const signUp = (email, password) => {
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
    tenant: "afca0a52-882c-4fa8-b71d-f6db2e36058b"
  });
  
  return auth().signInWithRedirect(provider);
};

export const logout = () => {
  return auth().signOut();
}