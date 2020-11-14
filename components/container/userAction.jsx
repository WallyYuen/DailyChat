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
  const { catalog, focusedUser, currentUser, notifications } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const userCall = notifications.find(notification => notification.type === "userCall");

  const openCatalog = () => {
    catalog.setViewerIsOpen(true);
  };

  const startCall = () => {
    if (userCall) {
      NotificationManager.warning(`${focusedUser?.name} is already in a call`);

      return;
    }

    db.collection("notifications")
      .doc("userCall")
      .set({
        type: "userCall",
        receiverId: focusedUser.uid,
        senderId: currentUser.uid,
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