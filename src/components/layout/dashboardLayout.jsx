import React from "react";

// Component
import Header from "../container/header";
import Chat from "../../pages/chat";
import Users from "../container/users";

const DashboardLayout = () => {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col">
            1 of 3
          </div>
          <div className="col-6">
            <Chat />
          </div>
          <div className="col">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
