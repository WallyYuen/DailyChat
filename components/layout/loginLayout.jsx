import React from "react";
import Link from "next/link";

// Components
import ExternalLogin from "components/container/externalLogin";

// UI
import Button from "components/ui/button"
import TextField from "components/ui/text"

// Styling
import button from "components/ui/button.module.scss";

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
        <div>
          <h1>Login</h1>
          <p>
            Login using your OGD account.
          </p>
        </div>
        <div>
          <TextField
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div>
          <TextField
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div>
          {error && <p>{error}</p>}
          <Button label="Login" className={button.neutral} type="submit" />
        </div>
        <ExternalLogin handleError={handleError} />
      </form>
    </div>
  );
};

export default LoginLayout;