import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CallActiveLayout from "components/layout/callActiveLayout";

// TODO: Change name
const CallActive = () => {
  enableStaticRendering(typeof window === "undefined");
  const { settings, currentUser } = useContext(ApplicationContext);

  const { callIsActive } = settings.dashboardSettings;
  const isInstructor = currentUser.hasInstructorRights;

  const closeCall = () => {
    const dashboardSettings = {
      ...settings.dashboardSettings, callIsActive: false,
    };

    db.collection("settings")
      .doc("dashboardSettings")
      .set(dashboardSettings)
      .catch((error) => {
        throw new Error(`Failed to save call settings, ${error}`);
      });
  };

  return (
    <CallActiveLayout
      callIsActive={callIsActive}
      isInstructor={isInstructor}
      closeCall={closeCall}
    />
  )
};

export default observer(CallActive);
