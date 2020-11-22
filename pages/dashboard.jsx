import React, { useEffect, useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";
import { PrivateRoute } from "lib/routing";

// Components
import DashboardLayout from "components/layout/dashboardLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const Dashboard = () => {
  enableStaticRendering(typeof window === "undefined");

  const {
    currentUser,
    lobbyUsers,
    onlineUsers,
    catalog,
    notifications,
    setNotifications,
  } = useContext(ApplicationContext);

  const waitingUserCount = lobbyUsers.length;
  const onlineUserCount = onlineUsers.length;

  const userCall = notifications.find(notification => notification.type === "userCall");

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = db.collection("settings").doc("catalog").onSnapshot((snapshot) => {
      catalog.setMaxPage(snapshot.data()?.maxPage);
      catalog.setActiveProjectId(snapshot.data()?.projectId);
    }, (error) => {
      catalog.setReadError(error.message);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribe = db.collection("projects").onSnapshot((snapshot) => {
      catalog.setProjects(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      catalog.setReadError(error.message);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = db.collection("notifications").onSnapshot((snapshot) => {
      setNotifications(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PrivateRoute>
      {catalog.readError && catalog.readError}
      <DashboardLayout
        hasInstructorRights={currentUser?.hasInstructorRights}
        isCalledByUser={!!userCall}
        lobbyUserCount={waitingUserCount}
        onlineUserCount={onlineUserCount}
      />
    </PrivateRoute>
  );
};

export default observer(Dashboard);
