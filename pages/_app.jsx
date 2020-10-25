import React, { useEffect, useMemo } from "react";
import { auth, userDb, now } from "lib/firebase";

// Store
import { ApplicationStore, ApplicationContext } from "stores/applicationStore";

import "styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  const store = useMemo(() => ApplicationStore.create(), []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      store.setUser(user);
      store.setLoading(false);

      if (!user) return;

      userDb.ref(`users/${user.uid}`).onDisconnect().update({
        isOnline: false,
      });
  
      userDb.ref(`users/${user.uid}`).set({
        ...store.currentUser,
        isOnline: true,
        lastLoginAt: now,
      })
      .catch(error => {
        throw new Error(`Failed to set user to online, ${error}`);
      });
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!store.isAuthenticated) return;

    const unsubscribe = userDb.ref("users")
      .on("value", (snapshot) => {
        if (!snapshot) return;

        store.setUsers(Object.values(snapshot.exportVal()));
      });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isAuthenticated]);

  return (
    <ApplicationContext.Provider value={store}>
      <Component {...pageProps} />
    </ApplicationContext.Provider>
  );
};

export default MyApp
