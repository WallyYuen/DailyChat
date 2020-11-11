import React, { useContext, useCallback } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { hideAll } from "tippy.js";
import { setApproval } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import LobbyModalLayout from "components/layout/lobbyModalLayout";
import UserListLayout from "components/layout/userListLayout";


const UserList = ({ users, modalHeader, approved }) => {
  enableStaticRendering(typeof window === "undefined");

  const { currentUser } = useContext(ApplicationContext);
  const isInstructor = currentUser.hasInstructorRights;

  const onClick = (user) => () => {
    setApproval({ ...user, approved });
  };

  const Modal = useCallback(({ user, ...props }) => (
    <LobbyModalLayout
      header={modalHeader}
      onClick={onClick(user)}
      user={{
        approved: user.approved,
        name: user.name,
        email: user.email,
      }}
      {...props}
      onCancel={() => { hideAll() }}
    />
  ), [modalHeader]);

  return (
    <UserListLayout
      users={users}
      modal={Modal}
      isInstructor={isInstructor}
    />
  );
};

export default observer(UserList);
