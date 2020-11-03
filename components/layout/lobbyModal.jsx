import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";

// Layout
import layout from "components/layout/lobbyModal.module.scss";
import button from "components/ui/button.module.scss";

const LobbyModal = ({ header, user, onClick, onCancel }) => {
  const { name, email, approved } = user;

  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>{header}</span>
      </div>
      <div className={layout.body}>
        <div className={layout.content}>
          {name}
          <div className={layout.details}>
            <span>approved: {approved ? "yes" : "no"}</span>
            <span>email: {email}</span>
          </div>
        </div>
        <div className={layout.actions}>
          <Button className={button.form} label="cancel" onClick={onCancel} />
          <Button className={clsx(button.form, button.primary)} label={"confirm"} onClick={onClick} />
        </div>
      </div>
    </div>
  )
};

export default LobbyModal;