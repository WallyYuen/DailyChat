import React from "react";
import { Link } from "react-router-dom";

// UI
import Textfield from "../../components/ui/textfield";
import Button from "../../components/ui/button";

const LoginLayout = ({
  email,
  password,
  error,
  handleSubmit,
  handleChange,
  customSignIn,
}) => {
  const { googleSignIn, githubSignIn, microsoftSignIn } = customSignIn;

  return (
    <div className="container">
      <form
        className="mt-5 py-5 px-5"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Login to <Link className="title ml-2" to="/">Daily Chat</Link>
        </h1>
        <p className="lead">
          Fill in the form below to login to your account.
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
          <Button label="Login" type="submit" classes={["btn-primary"]} />
        </div>
        <p>You can also log in with any of these services</p>
        <Button
          label="Google"
          type="button"
          onClick={googleSignIn}
          classes={["btn-danger", "mr-2"]}
        />
        <Button
          label="GitHub"
          type="button"
          onClick={githubSignIn}
          classes={["btn-secondary", "mr-2"]}
        />
        <Button
          label="Microsoft"
          type="button"
          onClick={microsoftSignIn}
          classes={["btn-secondary"]}
        />
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginLayout;