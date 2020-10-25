import { auth, userDb, now } from "lib/firebase";

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

export const logout = async (user) => {
  await userDb.ref(`users/${user.uid}`)
    .update({ isOnline: false })
    .then(() => auth().signOut())
    .catch(error => {
      throw new Error(`Failed to logout user, ${error}`);
    });
};

export const updateStatus = async (user) => {
  await userDb.ref(`users/${user.uid}`).set({
    ...user,
    isOnline: true,
    lastLoginAt: now,
  })
  .catch(error => {
    throw new Error(`Failed to update user status to logged in, ${error}`);
  });
};

export const onDisconnect = async (user) => {
  await userDb.ref(`users/${user.uid}`).onDisconnect().update({
    isOnline: false,
  });
};
