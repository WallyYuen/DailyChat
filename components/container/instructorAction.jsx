import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import InstructorActionLayout from "components/layout/instructorActionLayout";

const InstructorAction = () => {
  enableStaticRendering(typeof window === "undefined");

  const { catalog, settings } = useContext(ApplicationContext);
  const { callIsActive } = settings.dashboardSettings;

  const openCatalog = () => {
    catalog.setEditorIsOpen(true);
  };

  const startCall = () => {
    db.collection("settings")
      .doc("dashboardSettings")
      .set({ callIsActive: true })
      .catch((error) => {
        throw new Error(`Failed to save call settings, ${error}`);
      });
  };

  return (
    <InstructorActionLayout
      catalogProps={{
        catalogIsOpen: catalog.editorIsOpen,
        openCatalog: openCatalog,
      }}
      callProps={{ startCall }}
      callIsActive={callIsActive}
    />
  );
};

export default observer(InstructorAction);