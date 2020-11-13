import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorListLayout from "components/layout/actorListLayout";

const ActorList = () => {
  enableStaticRendering(typeof window === "undefined");
  const store = useContext(ApplicationContext);

  const selectedActor = store.userAsActor ?? store.focusedUser;
  const isInstructor = store.currentUser.hasInstructorRights;

  const resetUser = () => {
    store.setUserAsActor();
  };

  const handleSelectActor = user => () => {
    const isSelected = selectedActor?.uid === user.uid;

    if (isInstructor) {
      store.setUserAsActor(isSelected ? undefined : user);

      return;
    }

    store.setFocusedUser(isSelected ? undefined : user);
  };

  return (
    <ActorListLayout
      isInstructor={isInstructor}
      actors={store.actors}
      resetUser={resetUser}
      selectedActorId={selectedActor?.uid}
      onClick={handleSelectActor}
    />
  );
};

export default observer(ActorList);
