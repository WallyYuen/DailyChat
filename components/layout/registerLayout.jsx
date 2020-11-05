import React from "react";
import Link from "next/link";

// Components
import ExternalLogin from "components/container/externalLogin";

// UI
import Button from "components/ui/button"
import Textfield from "components/ui/textField"

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
        className=""
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Register for <Link className="" href="/">Daily Chat</Link>
        </h1>
        <p>You can register using your OGD account</p>
        <ExternalLogin handleError={handleError} />
      </form>
    </div>
  );
};

export default RegisterLayout;