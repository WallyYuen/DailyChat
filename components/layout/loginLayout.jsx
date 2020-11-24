import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button"

// Styling
import layout from "components/layout/loginLayout.module.scss";
import button from "components/ui/button.module.scss";

const LoginLayout = ({ login, error }) => {
  return (
    <div className={layout.container}>
      <div className={layout.frame}>
        <div className={layout.content}>
          <span>Login</span>
        </div>
        <div className={layout.actions}>
          {error && <p>{error}</p>}
          <Button
            label="Sign in with Microsoft"
            size="small"
            className={clsx(layout.button, button.neutral)}
            onClick={login}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;