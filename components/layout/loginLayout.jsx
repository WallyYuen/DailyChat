import React from "react";
import Link from "next/link";

// Components
import ExternalLogin from "components/container/externalLogin";

// Styles


const LoginLayout = ({
  email,
  handleError,
  password,
  error,
  handleSubmit,
  handleChange,
}) => {

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <p>
          Login using your OGD account.
        </p>
        <ExternalLogin handleError={handleError} />
      </form>
    </div>
  );
};

export default LoginLayout;