import React from "react";

// UI
import Button from "components/ui/button";

const ExternalLoginLayout = ({
  googleSignIn, githubSignIn, microsoftSignIn,
}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ExternalLoginLayout;
