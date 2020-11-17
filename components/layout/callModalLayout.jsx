import React, { useMemo } from "react";
import clsx from "clsx";

// Layout
import ModalContentLayout from "components/layout/modalContentLayout";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/callModalLayout.module.scss";
import button from "components/ui/button.module.scss";

const CallModalLayout = ({ onClose, caller, receiver }) => {
  const header = "Call";
  const classes = { container: layout.container };

  const content = useMemo(() => (
    <React.Fragment>
      <span>{`receiver: ${receiver}`}</span>
      <span>{`caller: ${caller}`}</span>
    </React.Fragment>
  ), [caller, receiver]);

  const actions = useMemo(() => (
    <Button
      className={clsx(layout.button, button.primary)}
      label="end call"
      size="small"
      onClick={onClose}
    />
  ), [onClose]);

  return <ModalContentLayout header={header} content={content} actions={actions} classes={classes} />;
};

export default CallModalLayout;