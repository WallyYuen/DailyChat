import React, { useEffect } from "react";
import { hideAll } from "tippy.js";
import { PrivateRoute } from "lib/routing";

// Components
import DashboardLayout from "components/layout/dashboardLayout";

const Dashboard = () => {
  const handleEsc = (event) => {
    if (event.keyCode !== 27) return;

    hideAll();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  );
};

export default Dashboard;
