import React, { useEffect, useContext } from "react";
import { hideAll } from "tippy.js";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { PrivateRoute } from "lib/routing";

// Components
import DashboardLayout from "components/layout/dashboardLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const Dashboard = () => {
  enableStaticRendering(typeof window === "undefined");
  const { lobbyUsers, onlineUsers } = useContext(ApplicationContext);

  const waitingUserCount = lobbyUsers.length;
  const onlineUserCount = onlineUsers.length;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") hideAll();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <PrivateRoute>
      <DashboardLayout lobbyUserCount={waitingUserCount} onlineUserCount={onlineUserCount} />
    </PrivateRoute>
  );
};

export default observer(Dashboard);
