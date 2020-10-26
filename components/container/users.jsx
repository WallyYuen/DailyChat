import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

const Users = () => {
  enableStaticRendering(typeof window === "undefined");
  const { onlineUsers } = useContext(ApplicationContext);

  return <UserListLayout users={onlineUsers} />;
};

export default observer(Users);
