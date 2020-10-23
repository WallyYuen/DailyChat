import React, { useState } from "react";
import { login } from "../helpers/auth";
import LoginLayout from "../components/layout/loginLayout";

const Login = () => {
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

    await login(email, password)
      .catch(handleError);
  };

  return (
    <LoginLayout
      email={email}
      handleError={handleError}
      password={password}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default Login;
