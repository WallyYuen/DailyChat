import React from "react";
import { PrivateRoute } from "lib/routing";

// Components
import DashboardLayout from "components/layout/dashboardLayout";

const Dashboard = () => {
  return (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  );
};

export default Dashboard;
