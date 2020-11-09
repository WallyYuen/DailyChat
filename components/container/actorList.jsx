import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorListLayout from "components/layout/actorListLayout";

const ActorList = () => {
  enableStaticRendering(typeof window === "undefined");

  const store = useContext(ApplicationContext);
  const isInstructor = store.currentUser.hasInstructorRights;

  const resetUser = () => {
    store.setUserAsActor();
  };

  const handleSelectActor = user => () => {
    if (isInstructor) {
      const isSelected = store.userAsActor?.uid === user.uid;
      store.setUserAsActor(isSelected ? undefined : user);

      return;
    }

    const isSelected = store.focusedUser?.uid === user.uid;
    store.setFocusedUser(isSelected ? undefined : user);
  };

  return <ActorListLayout
    isInstructor={isInstructor}
    actors={store.actors}
    resetUser={resetUser}
    onClick={handleSelectActor}
  />;
};

export default observer(ActorList);
