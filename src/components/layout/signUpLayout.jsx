import React from "react";
import { Link } from "react-router-dom";
import ExternalLogin from "../container/externalLogin";

// UI
import Textfield from "../ui/textfield"
import Button from "../ui/button"

const SignUpLayout = ({
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
          Sign up to <Link className="title ml-2" to="/">Daily Chat</Link>
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
          <Button label="Sign up" type="submit" classes={["btn-primary"]} />
        </div>
        <p>You can also sign up with any of these services</p>
        <ExternalLogin handleError={handleError} />
        <hr />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpLayout;