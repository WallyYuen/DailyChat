import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { setApproval } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

// Component
import LobbyModal from "components/layout/lobbyModal";

const LobbyList = () => {
  enableStaticRendering(typeof window === "undefined");

  const { lobbyUsers, currentUser } = useContext(ApplicationContext);
  const isInstructor = currentUser.hasInstructorRights;

  const onClick = (user) => () => {
    setApproval({ ...user, approved: true });
  };

  const Modal = ({ user, ...props }) => (
    <LobbyModal
      header="Add user"
      onClick={onClick(user)}
      user={{
        approved: user.approved,
        name: user.name,
        email: user.email,
      }}
      {...props}
    />
  );

  return (
    <UserListLayout
      users={lobbyUsers}
      modal={Modal}
      header="Lobby"
      isInstructor={isInstructor}
    />
  );
};

export default observer(LobbyList);
