import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/callActiveLayout.module.scss";
import button from "components/ui/button.module.scss";

// TODO: create modal component
const CallActiveLayout = ({ callIsActive, isInstructor, closeCall }) => {
  return (
    <div className={clsx(layout.dimmer, { [layout.callIsActive]: callIsActive })}>
      <div className={layout.container}>
        <div className={layout.content}>
          <span>Call in progress</span>
        </div>
      </div>
      {isInstructor && (
        <div className={layout.buttonContainer}>
          <Button
            label="close call"
            size="small"
            className={clsx(button.primary, layout.button)}
            onClick={closeCall}
          />
        </div>
      )}
    </div>
  );
};

export default CallActiveLayout;