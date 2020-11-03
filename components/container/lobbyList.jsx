import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Component
import UserList from "components/container/userList";

// Store
import { ApplicationContext } from "stores/applicationStore";

const LobbyList = () => {
  enableStaticRendering(typeof window === "undefined");
  const { lobbyUsers } = useContext(ApplicationContext);

  return (
    <UserList
      users={lobbyUsers}
      modalHeader="Add user"
      approved
    />
  );
};

export default observer(LobbyList);
