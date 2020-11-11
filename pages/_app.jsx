import React, { useEffect, useMemo } from "react";
import { auth, userDb, db } from "lib/firebase";
import { updateStatus, onDisconnect } from "lib/auth";
import { getUserRole } from "lib/role";

// Store
import { ApplicationStore, ApplicationContext } from "stores/applicationStore";

// Style
import "public/styles/styles.scss";

const MyApp = ({ Component, pageProps }) => {
  const store = useMemo(() => ApplicationStore.create(), []);
  const { setting } = store;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      getUserRole(user).then((role) => {
        if (user) user.role = role;

        store.setUser(user);
        store.setLoading(false);

        if (user) {
          onDisconnect(store.currentUser);
          updateStatus(store.currentUser);
        }
      });
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!store.isAuthenticated) return;

    const unsubscribe = userDb.ref("users")
      .on("value", (snapshots) => {
        const users = snapshots?.exportVal();

        if (users) store.setUsers(Object.values(users));
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isAuthenticated]);

  useEffect(() => {
    const unsubscribe = db.collection("settings").onSnapshot((snapshot) => {
      snapshot.docs.forEach(doc => setting.setup(doc.id, doc.data()));
    }, (error) => {
      setting.setReadError(error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ApplicationContext.Provider value={store}>
      {setting.readError && setting.readError}
      <Component {...pageProps} />
    </ApplicationContext.Provider>
  );
};

// Not supported yet in current build (Next.js 9.5.5)
// export async function getStaticProps() {
//   const roleOptions = await userDb.ref("roleOptions").once("value");

//   return { props: { roleOptions } };
// }

export default MyApp;
