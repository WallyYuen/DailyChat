import React, { useState } from "react";
import { register } from "lib/auth";
import { PublicRoute } from "lib/routing";

// Components
import RegisterLayout from "components/layout/registerLayout";

const Register = () => {
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

    register(email, password)
      .catch(handleError);
  };

  return (
    <PublicRoute>
      <RegisterLayout
        email={email}
        handleError={handleError}
        password={password}
        error={error}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </PublicRoute>
  );
};

export default Register;
