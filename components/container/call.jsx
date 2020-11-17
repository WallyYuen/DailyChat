import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CallModalLayout from "components/layout/callModalLayout";

const Call = () => {
  enableStaticRendering(typeof window === "undefined");
  const { notifications } = useContext(ApplicationContext);

  const userCall = notifications.find(notification => notification.type === "userCall");
  
  const studentName = userCall?.sender?.name;
  const actorName = userCall?.receiver?.name;

  const endCall = () => {
    db.collection("notifications")
      .doc("userCall")
      .delete()
      .catch((error) => {
        throw new Error(`Failed to remove call settings, ${error}`);
      });
  };

  return (
    <CallModalLayout
      caller={studentName}
      receiver={actorName}
      onClose={endCall}
    />
  );
};

export default observer(Call);