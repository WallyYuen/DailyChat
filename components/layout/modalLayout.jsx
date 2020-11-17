import React from "react";
import clsx from "clsx";

// Styling
import layout from "components/layout/modalLayout.module.scss";

const ModalLayout = ({ header, content, actions, classes = {} }) => {
  return (
    <div className={clsx(layout.container, classes.container)}>
      <div className={clsx(layout.header, classes.header)}>
        <span>{header}</span>
      </div>
      <div className={layout.body}>
        <div className={clsx(layout.content, classes.content)}>
          {content}
        </div>
        <div className={clsx(layout.actions, classes.actions)}>
          {actions}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;