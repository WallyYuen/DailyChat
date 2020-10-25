import React from "react";
import Link from "next/link";

// Components
import ExternalLogin from "components/container/externalLogin";

// UI
import Button from "components/ui/button"
import Textfield from "components/ui/textfield"

const RegisterLayout = ({
  email,
  handleError,
  password,
  error,
  handleSubmit,
  handleChange,
}) => {
  return (
    <div className="container">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Register for <Link className="title ml-2" href="/">Daily Chat</Link>
        </h1>
        <p className="lead">
          Fill in the form below to create an account.
        </p>
        <div className="form-group">
          <Textfield
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <Textfield
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div className="form-group">
          {error && <p className="text-danger">{error}</p>}
          <Button label="Register" type="submit" classes={["btn-primary"]} />
        </div>
        <p>You can also register with any of these services</p>
        <ExternalLogin handleError={handleError} />
        <hr />
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterLayout;