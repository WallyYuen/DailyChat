import React from "react";

// Component
import Header from "components/container/header";
import ActorList from "components/container/actorList";
import ActorAction from "components/container/actorAction";
import Chat from "components/container/chat";
import ContactList from "components/container/contactList";
import LobbyList from "components/container/lobbyList";

// Layout
import layout from "assets/styles/layout/dashboardLayout.module.scss";

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={layout.container}>
        <div className={layout.leftColumn}>
          <ActorList />
          <ActorAction />
        </div>
        <Chat />
        <div className={layout.rightColumn}>
          <div>
            <ContactList />
            {/* actions */}
          </div>
          <div>
            <LobbyList />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
