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
    <React.Fragment>
      <Header />
      <div className={layout.container}>
        <div>
          <ActorList />
          <ActorAction />
        </div>
        <Chat />
        <div>
          <UserList />
          {/* actions */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
