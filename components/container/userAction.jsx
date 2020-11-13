import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { NotificationManager } from "react-notifications";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserActionLayout from "components/layout/userActionLayout";

// Styling
import "react-notifications/lib/notifications.css";

const UserAction = () => {
  const { catalog, focusedUser, currentUser, settings } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const openCatalog = () => {
    catalog.setViewerIsOpen(true);
  };

  const startCall = () => {
    if (settings.callSettings) {
      NotificationManager.warning("This person is already in a call");

      return;
    }

    db.collection("settings")
      .doc("callSettings")
      .set({
        receiverId: focusedUser.uid,
        callerId: currentUser.uid,
      })
      .catch((error) => {
        throw new Error(`Failed to save call request, ${error}`);
      });
  };

  return (
    <UserActionLayout
      startCall={startCall}
      focusedUser={focusedUser}
      catalogProps={{
        openCatalog,
        catalogIsOpen: catalog.viewerIsOpen,
      }}
    />
  );
};

export default observer(UserAction);