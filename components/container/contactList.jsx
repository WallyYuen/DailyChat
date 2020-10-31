import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Component
import StudentList from "components/container/studentList";

// Store
import { ApplicationContext } from "stores/applicationStore";

const ContactList = () => {
  enableStaticRendering(typeof window === "undefined");
  const { onlineUsers } = useContext(ApplicationContext);

  return (
    <StudentList
      users={onlineUsers}
      modalHeader="Remove user"
      approved={false}
    />
  );
};

export default observer(ContactList);
