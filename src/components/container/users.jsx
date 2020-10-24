import React, { useContext } from "react";
import { observer } from "mobx-react";
import UserListLayout from "../layout/userListLayout";
import { ApplicationContext } from "../../stores/applicationStore";

const Users = () => {
  const { onlineUsers } = useContext(ApplicationContext);

  return <UserListLayout users={onlineUsers} />;
};

export default observer(Users);
