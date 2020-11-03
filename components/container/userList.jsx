import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { setApproval } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

// Component
import LobbyModal from "components/layout/lobbyModal";

const UserList = ({ users, modalHeader, approved }) => {
  enableStaticRendering(typeof window === "undefined");

  const { currentUser } = useContext(ApplicationContext);
  const isInstructor = currentUser.hasInstructorRights;

  const onClick = (user) => () => {
    setApproval({ ...user, approved });
  };

  const Modal = ({ user, ...props }) => (
    <LobbyModal
      header={modalHeader}
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
      users={users}
      modal={Modal}
      isInstructor={isInstructor}
    />
  );
};

export default observer(UserList);
