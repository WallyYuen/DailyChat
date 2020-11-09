import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import InstructorActionLayout from "components/layout/instructorActionLayout";

const InstructorAction = () => {
  const { catalog } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const openCatalog = () => {
    catalog.setIsOpen(true);
  };

  return (
    <InstructorActionLayout
      catalogProps={{
        catalogIsOpen: catalog.isOpen,
        openCatalog: openCatalog,
      }}
    />
  );
};

export default observer(InstructorAction);