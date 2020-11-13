import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CallLayout from "components/layout/callLayout";

const Call = () => {
  enableStaticRendering(typeof window === "undefined");

  const { settings } = useContext(ApplicationContext);
  const { caller, receiver } = settings.callSettings;

  const endCall = () => {
    db.collection("settings")
      .doc("callSettings")
      .delete()
      .catch((error) => {
        throw new Error(`Failed to remove call settings, ${error}`);
      });
  };

  return (
    <CallLayout
      caller={caller?.name}
      receiver={receiver?.name}
      onClose={endCall}
    />
  );
};

export default observer(Call);