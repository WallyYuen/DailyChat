import React, { useState } from "react";
import { login, signInWithGoogle, signInWithGitHub, signInWithMicrosoft } from "../helpers/auth";
import LoginLayout from "../components/layout/loginLayout";

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

  const microsoftSignIn = async (event) => {
    try {
      await signInWithMicrosoft();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginLayout
      email={email}
      password={password}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      customSignIn={{
        googleSignIn,
        githubSignIn,
        microsoftSignIn,
      }}
    />
  );
};

export default Login;
