import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import GlobalCallLayout from "components/layout/globalCallLayout";

const GlobalCall = () => {
  enableStaticRendering(typeof window === "undefined");
  const { notifications, currentUser } = useContext(ApplicationContext);

  const isInstructor = currentUser.hasInstructorRights;
  const instructorCall = notifications.find(notification => notification.type === "instructorCall");

  const closeCall = () => {
    db.collection("notifications")
      .doc("instructorCall")
      .delete()
      .catch((error) => {
        throw new Error(`Failed to remove call request, ${error}`);
      });
  };

  return (
    <GlobalCallLayout
      isInstructor={isInstructor}
      closeCall={closeCall}
      callIsActive={instructorCall}
    />
  )
};

export default observer(GlobalCall);
