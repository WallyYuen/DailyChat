import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import InstructorActionLayout from "components/layout/instructorActionLayout";

const InstructorAction = () => {
  enableStaticRendering(typeof window === "undefined");

  const { catalog, currentUser } = useContext(ApplicationContext);

  const openCatalog = () => {
    catalog.setEditorIsOpen(true);
  };

  const startCall = () => {
    db.collection("notifications")
      .doc("instructorCall")
      .set({
        type: "instructorCall",
        senderId: currentUser.uid,
      })
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
    />
  );
};

export default observer(InstructorAction);