import React, { useState } from "react";
import { signUp } from "../helpers/auth";
import SignUpLayout from "../components/layout/signUpLayout";

const SignUp = () => {
  const [error, setError] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleError = error => setError(error.message);

  const handleChange = (event) => {
    const type = event.target.name;
    const setValue = { email: setEmail, password: setPassword }[type];

    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    signUp(email, password)
      .catch(handleError);
  };

  return (
    <SignUpLayout
      email={email}
      handleError={handleError}
      password={password}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default SignUp;
