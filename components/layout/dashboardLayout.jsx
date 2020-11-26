import React from "react";
import clsx from "clsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Component
import ActorList from "components/container/actorList";
import ActorAction from "components/container/actorAction";
import InstructorAction from "components/container/instructorAction";
import UserAction from "components/container/userAction";
import Chat from "components/container/chat";
import ContactList from "components/container/contactList";
import LobbyList from "components/container/lobbyList";
import GlobalCall from "components/container/globalCall";
import Call from "components/container/call";
import LegendLayout from "components/layout/legendLayout";

// Styling
import layout from "components/layout/dashboardLayout.module.scss";

const DashboardLayout = ({ lobbyUserCount, onlineUserCount, hasInstructorRights, isCalledByUser }) => {
  const showCount = number => number > 0 ? layout.superscript : layout.hidden;

  return (
    <div className={layout.container}>
      <div className={layout.leftColumn}>
        <ActorList />
        <ActorAction />
        {hasInstructorRights && <InstructorAction />}
        {!hasInstructorRights && <LegendLayout />}
      </div>
      <div className={layout.centerColumn}>
        <Chat />
      </div>
      <div className={layout.rightColumn}>
        <Tabs className={layout.tabs}>
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
        <UserAction />
      </div>
      <GlobalCall />
      {isCalledByUser && hasInstructorRights && <Call />}
    </div>
  );
};

export default DashboardLayout;
