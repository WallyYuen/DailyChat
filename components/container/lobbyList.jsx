import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Component
import StudentList from "components/container/studentList";

// Store
import { ApplicationContext } from "stores/applicationStore";

const LobbyList = () => {
  enableStaticRendering(typeof window === "undefined");
  const { lobbyUsers } = useContext(ApplicationContext);

  return (
    <StudentList
      users={lobbyUsers}
      modalHeader="Add user"
      approved
    />
  );
};

export default observer(LobbyList);
