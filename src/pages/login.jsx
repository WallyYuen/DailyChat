import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

const Login = () => {
  const [error, setError] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    const type = event.target.name;
    const setValue = { email: setEmail, password: setPassword }[type];

    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignIn = async (event) => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const githubSignIn = async (event) => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Login to <Link className="title ml-2" to="/">Daily Chat</Link>
        </h1>
        <p className="lead">
          Fill in the form below to login to your account.
        </p>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="form-group">
          {error && (
            <p className="text-danger">{error}</p>
          )}
          <button className="btn btn-primary px-5" type="submit">Login</button>
        </div>
        <p>You can also log in with any of these services</p>
        <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
          Sign in with Google
        </button>
        <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
          Sign in with GitHub
        </button>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  )
};

export default Login;
