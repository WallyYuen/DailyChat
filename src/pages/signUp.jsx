import React, { useState } from "react";
import { signUp, signInWithGoogle, signInWithGitHub, signInWithMicrosoft } from "../helpers/auth";
import SignUpLayout from "../components/layout/signUpLayout";

const SignUp = () => {
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
      await signUp(email, password);
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
    <SignUpLayout
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

export default SignUp;
