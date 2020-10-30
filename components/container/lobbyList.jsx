import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { setApproval } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

const LobbyList = () => {
  enableStaticRendering(typeof window === "undefined");

  const { lobbyUsers, currentUser } = useContext(ApplicationContext);
  const isInstructor = currentUser.hasInstructorRights;

  const onClick = (user) => () => {
    setApproval({ ...user, approved: true });
  };

  return (
    <UserListLayout
      users={lobbyUsers}
      buttonLabel="Add user"
      header="Lobby"
      onClick={isInstructor ? onClick : undefined}
    />
  );
};

export default observer(LobbyList);
