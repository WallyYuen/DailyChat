import React, { useState } from "react";
import { signInWithMicrosoft } from "lib/auth";
import { PublicRoute } from "lib/routing";

// Components
import LoginLayout from "components/layout/loginLayout";

const Login = () => {
  const [error, setError] = useState();

  const microsoftSignIn = async (event) => {
    event.preventDefault();
    await signInWithMicrosoft()
      .catch(error => setError(error.message));
  };

  return (
    <PublicRoute>
      <LoginLayout error={error} login={microsoftSignIn} />
    </PublicRoute>
  );
};

export default Login;
