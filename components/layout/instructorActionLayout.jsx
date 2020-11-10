import React from "react";

// Component
import CatalogEditor from "components/container/catalogEditor";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/instructorActionLayout.module.scss";
import button from "components/ui/button.module.scss";

const InstructorActionLayout = ({ catalogProps }) => {
  const { openCatalog, catalogIsOpen } = catalogProps;

  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Instructor actions</span>
      </div>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="Catalog" onClick={openCatalog} />
      </div>
      {catalogIsOpen && <CatalogEditor />}
    </div>
  );
};

export default InstructorActionLayout;