import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CallActiveLayout from "components/layout/callActiveLayout";

const CallActive = () => {
  enableStaticRendering(typeof window === "undefined");
  const { setting, currentUser } = useContext(ApplicationContext);

  const { callIsActive } = setting.dashboardSettings;
  const isInstructor = currentUser.hasInstructorRights;

  const closeCall = () => {
    db.collection("settings")
      .doc("dashboardSettings")
      .set({ callIsActive: false })
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
