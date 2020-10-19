import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Home from './pages/home';
import Chat from './pages/chat';
import SignUp from './pages/signUp';
import Login from './pages/login';
import { auth } from './services/firebase';

import "./styles.css";

import { ApplicationStore, ApplicationContext } from "./stores/applicationStore";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !authenticated
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  )
}

const App = () => {
  const store = useMemo(() => ApplicationStore.create(), []);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      store.setUser(user)
      store.setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.isLoading ? (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <ApplicationContext.Provider value={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/chat"
            authenticated={store.isAuthenticated}
            component={Chat}
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
}

export default observer(App);
