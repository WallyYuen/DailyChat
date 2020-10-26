import React from "react";

// Component
import Header from "components/container/header";
import Chat from "components/container/chat";
import UserList from "components/container/userList";
import ActorList from "components/container/actorList";

const DashboardLayout = () => {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col">
            <ActorList />
          </div>
          <div className="col-6">
            <Chat />
          </div>
          <div className="col">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
