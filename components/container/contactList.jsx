import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Component
import UserList from "components/container/userList";

// Store
import { ApplicationContext } from "stores/applicationStore";

const ContactList = () => {
  enableStaticRendering(typeof window === "undefined");
  const { onlineUsers } = useContext(ApplicationContext);

  return (
    <UserList
      users={onlineUsers}
      modalHeader="Remove user"
      approved={false}
    />
  );
};

export default observer(ContactList);
