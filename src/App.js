import React, { useEffect, useMemo, useCallback } from "react";
import firebase from "firebase/app";
import { observer } from "mobx-react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import { auth, userDb } from "./lib/firebase";

import "./styles.css";

// Store
import { ApplicationStore, ApplicationContext } from "./stores/applicationStore";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !authenticated
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  );
};

const App = () => {
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
        lastLoginAt: firebase.database.ServerValue.TIMESTAMP,
        isOnline: true,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const HomePage = useCallback(() => <Home isAuthenticated={store.isAuthenticated} />, []);

  return store.isLoading ? (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <ApplicationContext.Provider value={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute
            path="/dashboard"
            authenticated={store.isAuthenticated}
            component={Dashboard}
          />
          <PublicRoute
            path="/signup"
            authenticated={store.isAuthenticated}
            component={SignUp}
          />
          <PublicRoute
            path="/login"
            authenticated={store.isAuthenticated}
            component={Login}
          />
        </Switch>
      </BrowserRouter>
    </ApplicationContext.Provider>
  );
};

export default observer(App);
