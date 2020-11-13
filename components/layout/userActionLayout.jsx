import React from "react";

// Component
import CatalogViewer from "components/container/catalogViewer";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/userActionLayout.module.scss";
import button from "components/ui/button.module.scss";

const UserActionLayout = ({ catalogProps, focusedUser, startCall }) => {
  const { openCatalog, catalogIsOpen } = catalogProps;

  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>User actions</span>
      </div>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="catalog" onClick={openCatalog} />
      </div>
      {focusedUser && (
        <Button className={button.neutral} label="call user" onClick={startCall} />
      )}
      {catalogIsOpen && <CatalogViewer />}
    </div>
  );
};

export default UserActionLayout;