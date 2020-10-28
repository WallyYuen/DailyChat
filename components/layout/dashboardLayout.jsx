import React from "react";

// Component
import Header from "components/container/header";
import ActorList from "components/container/actorList";
import ActorAction from "components/container/actorAction";
import Chat from "components/container/chat";
import UserList from "components/container/userList";

// Layout
import layout from "assets/styles/layout/dashboardLayout.module.scss";

const DashboardLayout = () => {
  return (
    <div>
      <div className={layout.container}>
        <Header />
        <ActorList />
        <ActorAction />
      </div>
      <div>
        <Chat />
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
};

export default DashboardLayout;
