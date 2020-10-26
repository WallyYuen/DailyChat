import React, { useEffect, useMemo } from "react";
import { auth, userDb } from "lib/firebase";
import { updateStatus, onDisconnect } from "lib/auth";
import { getUserRole } from "lib/roles";

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

      getUserRole(user).then((role) => {
        store.currentUser.setRole(role);
        
        onDisconnect(store.currentUser);
        updateStatus(store.currentUser);
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

// Not supported yet in current build (Next.js 9.5.5)
// export async function getStaticProps() {
//   const roleOptions = await userDb.ref("roleOptions").once('value');

//   return { props: { roleOptions } };
// }

export default MyApp;
