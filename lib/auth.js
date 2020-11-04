import { auth, userDb, now } from "lib/firebase";
import { roles } from "lib/role";

const logoutProperties = {
  isOnline: false,
  // approved: false,
};

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
  if (user.role === roles.actor) {
    auth().signOut();

    return;
  }

  await userDb.ref(`users/${user.uid}`)
    .update(logoutProperties)
    .then(() => auth().signOut())
    .catch(error => {
      throw new Error(`Failed to logout user, ${error}`);
    });
};

export const updateStatus = async (user) => {
  if (user.role === roles.actor) return;

  await userDb.ref(`users/${user.uid}`).set({
    ...user,
    lastLoginAt: now,
    isOnline: true,
  })
  .catch(error => {
    throw new Error(`Failed to update user status to logged in, ${error}`);
  });
};

export const onDisconnect = async (user) => {
  if (user.role === roles.actor) return;

  await userDb
    .ref(`users/${user.uid}`)
    .onDisconnect()
    .update(logoutProperties);
};

export const setApproval = async (user) => {
  await userDb
    .ref(`users/${user.uid}`)
    .set(user)
    .catch(error => {
      throw new Error(`Failed to set user approval, ${error}`);
    });
};
