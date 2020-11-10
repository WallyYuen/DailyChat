import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserActionLayout from "components/layout/userActionLayout";

const UserAction = () => {
  const { catalog } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const openCatalog = () => {
    catalog.setViewerIsOpen(true);
  };

  return (
    <UserActionLayout
      catalogProps={{
        catalogIsOpen: catalog.viewerIsOpen,
        openCatalog: openCatalog,
      }}
    />
  );
};

export default observer(UserAction);