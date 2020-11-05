import React from "react";

// Layout
import InstructorActionLayout from "components/layout/instructorActionLayout";

// Component
import CatalogManager from "components/container/catalogManager";

const InstructorAction = () => {
  const openCatalog = (event) => {

  };

  const catalogContent = <CatalogManager />

  return (
    <InstructorActionLayout
      onClick={openCatalog}
      catalogContent={catalogContent}
    />
  );
};

export default InstructorAction;