import React from "react";
import clsx from "clsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Component
import ActorList from "components/container/actorList";
import ActorAction from "components/container/actorAction";
import Chat from "components/container/chat";
import ContactList from "components/container/contactList";
import LobbyList from "components/container/lobbyList";

// Styling
import layout from "assets/styles/layout/dashboardLayout.module.scss";

const DashboardLayout = ({ lobbyUserCount, onlineUserCount }) => {
  const showCount = number => number > 0 ? layout.superscript : layout.hidden;

  return (
    <div className={layout.container}>
      <div className={layout.leftColumn}>
        <ActorList />
        <ActorAction />
      </div>
      <div className={layout.centerColumn}>
        <Chat />
      </div>
      <div className={layout.rightColumn}>
        <Tabs>
          <TabList>
            <Tab>
              <div className={layout.header}>
                <span>Contacts</span>
                <div className={showCount(onlineUserCount)}>{onlineUserCount}</div>
              </div>
            </Tab>
            <Tab>
              <div className={layout.header}>
                <span>Lobby</span>
                <div className={clsx(showCount(lobbyUserCount), layout.important)}>{lobbyUserCount}</div>
              </div>
            </Tab>
          </TabList>
          <TabPanel>
            <ContactList />
          </TabPanel>
          <TabPanel>
            <LobbyList />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardLayout;
