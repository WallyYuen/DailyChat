import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { auth, userDb } from "lib/firebase";
import { userLoggedIn, userLoggedOut } from "lib/auth";

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

      userLoggedOut(user);
      userLoggedIn(store.currentUser);
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

export default MyApp;
