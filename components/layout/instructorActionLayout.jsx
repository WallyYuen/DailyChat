import React from "react";

// Component
import CatalogManager from "components/container/catalogManager";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/instructorActionLayout.module.scss";
import button from "components/ui/button.module.scss";

const InstructorActionLayout = ({ onClick, catalogContent }) => {
  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Instructor actions</span>
      </div>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="Catalogus" onClick={onClick} />
      </div>
      <div>
        <CatalogManager />
      </div>
    </div>
  );
};

export default InstructorActionLayout;