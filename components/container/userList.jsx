import React, { useContext } from "react";
import { observer } from "mobx-react";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

const UserList = () => {
  const { onlineUsers } = useContext(ApplicationContext);

  return <UserListLayout users={onlineUsers} />;
};

export default observer(UserList);
