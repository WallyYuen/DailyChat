import React, { useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/home';
import Chat from './pages/chat';
import SignUp from './pages/signUp';
import Login from './pages/login';
import { auth } from './services/firebase';
import "./styles.css";

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
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const onAuthStateChange = (callback) => {
    setIsLoading(false);
    return auth().onAuthStateChanged(user => callback(!!user));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setAuthenticated);
    
    return () => unsubscribe();
  }, [isLoading]);

  return isLoading ? (
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        />
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </Router>
  );
}

export default App;
