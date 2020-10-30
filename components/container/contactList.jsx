import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { setApproval } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import UserListLayout from "components/layout/userListLayout";

const ContactList = () => {
  enableStaticRendering(typeof window === "undefined");

  const { onlineUsers, currentUser } = useContext(ApplicationContext);
  const isInstructor = currentUser.hasInstructorRights;

  const onClick = (user) => () => {
    setApproval({ ...user, approved: false });
  };

  return (
    <UserListLayout
      users={onlineUsers}
      buttonLabel="Remove user"
      header="Contacts"
      onClick={isInstructor ? onClick : undefined}
    />
  );
};

export default observer(ContactList);
