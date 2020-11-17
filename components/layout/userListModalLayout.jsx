import React, { useMemo } from "react";
import clsx from "clsx";

// Layout
import ModalLayout from "components/layout/modalLayout";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/userListModalLayout.module.scss";
import button from "components/ui/button.module.scss";

const UserListModalLayout = ({ header, user, onClick, onCancel }) => {
  const { name, email, approved } = user;

  const content = useMemo(() => (
    <React.Fragment>
      {name}
      <div className={layout.details}>
        <span>approved: {approved ? "yes" : "no"}</span>
        <span>email: {email}</span>
      </div>
    </React.Fragment>
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

  return <ModalLayout header={header} content={content} actions={actions} />;
};

export default UserListModalLayout;