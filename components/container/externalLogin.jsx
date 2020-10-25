import React from "react";
import { signInWithGoogle, signInWithGitHub, signInWithMicrosoft } from "lib/auth";

// Layout
import ExternalLoginLayout from "components/layout/externalLoginLayout";

const ExternalLogin = ({ handleError }) => {
  const googleSignIn = async (event) => {
    event.preventDefault();
    await signInWithGoogle()
      .catch(handleError);
  };

  const githubSignIn = async (event) => {
    event.preventDefault();
    await signInWithGitHub()
      .catch(handleError);
  };

  const microsoftSignIn = async (event) => {
    event.preventDefault();
    await signInWithMicrosoft()
      .catch(handleError);
  };

  return (
    <ExternalLoginLayout
      googleSignIn={googleSignIn}
      githubSignIn={githubSignIn}
      microsoftSignIn={microsoftSignIn}
    />
  );
};

export default ExternalLogin;
