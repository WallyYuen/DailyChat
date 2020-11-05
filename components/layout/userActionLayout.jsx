import React from "react";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/userActionLayout.module.scss";

const UserActionLayout = () => {
  return (
    <div className={layout.container}>
      <Button label="Catalogus" />
    </div>
  );
};

export default UserActionLayout;