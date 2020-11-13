import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/callLayout.module.scss";
import button from "components/ui/button.module.scss";

// TODO: create modal component
const CallLayout = ({ onClose, caller, receiver }) => {
  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Call</span>
      </div>
      <div className={layout.body}>
        <div className={layout.content}>
          <span>{`receiver: ${receiver}`}</span>
          <span>{`caller: ${caller}`}</span>
        </div>
        <div className={layout.actions}>
          <Button
            className={clsx(layout.button, button.primary)}
            label="end call"
            size="small"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default CallLayout;