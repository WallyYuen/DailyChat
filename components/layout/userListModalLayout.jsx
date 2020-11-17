import React, { useMemo } from "react";
import clsx from "clsx";

// Layout
import ModalContentLayout from "components/layout/modalContentLayout";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/userListModalLayout.module.scss";
import button from "components/ui/button.module.scss";

const UserListModalLayout = ({ header, user, onClick, onCancel }) => {
  const { name, email, approved } = user;

  const content = useMemo(() => (
    <div className={layout.content}>
      {name}
      <div className={layout.details}>
        <span>approved: {approved ? "yes" : "no"}</span>
        <span>email: {email}</span>
      </div>
    </div>
  ), [name, email, approved ]);

  const actions = useMemo(() => (
    <React.Fragment>
      <Button
        className={clsx(layout.button, button.transparent)}
        label="cancel"
        size="small"
        onClick={onCancel}
      />
      <Button
        className={clsx(layout.button, button.primary)}
        label="confirm"
        size="small"
        onClick={onClick}
      />
    </React.Fragment>
  ), [onCancel, onClick]);

  return <ModalContentLayout header={header} content={content} actions={actions} />;
};

export default UserListModalLayout;