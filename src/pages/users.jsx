import React from "react";
import { observer } from "mobx-react";
import UserListLayout from "../components/layout/userListLayout";

const Users = () => {
  return <UserListLayout />;
};

export default observer(Users);
