import React, { useEffect, useContext } from "react";
import { hideAll } from "tippy.js";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";
import { PrivateRoute } from "lib/routing";

// Components
import DashboardLayout from "components/layout/dashboardLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const Dashboard = () => {
  enableStaticRendering(typeof window === "undefined");
  const { currentUser, lobbyUsers, onlineUsers, catalog, settings } = useContext(ApplicationContext);

  const waitingUserCount = lobbyUsers.length;
  const onlineUserCount = onlineUsers.length;

  const { callSettings } = settings;
  const handleKeyDown = (event) => {
    if (event.key === "Escape") hideAll();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection("projects").onSnapshot((snapshot) => {
      catalog.setProjects(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      catalog.setReadError(error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PrivateRoute>
      <DashboardLayout
        hasInstructorRights={currentUser?.hasInstructorRights}
        lobbyUserCount={waitingUserCount}
        onlineUserCount={onlineUserCount}
      />
    </PrivateRoute>
  );
};

export default observer(Dashboard);
