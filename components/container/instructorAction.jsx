import React, { useState } from "react";

// Layout
import InstructorActionLayout from "components/layout/instructorActionLayout";

// Component
import CatalogManager from "components/container/catalogManager";

const InstructorAction = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const openCatalog = (event) => {
    setIsCatalogOpen(true);
  };

  const closeCatalog = (event) => {
    setIsCatalogOpen(false);
  };

  const catalogContent = isCatalogOpen ? <CatalogManager onCancel={closeCatalog} /> : null;

  return (
    <InstructorActionLayout
      onClick={openCatalog}
      catalogContent={catalogContent}
    />
  );
};

export default InstructorAction;