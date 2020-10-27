import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorListLayout from "components/layout/actorListLayout";

const ActorList = () => {
  enableStaticRendering(typeof window === "undefined");

  const store = useContext(ApplicationContext);
  const isInstructor = store.currentUser.role === "instructor";

  const usersAsActor = store.actors.map(actor => ({
    uid: actor.uid,
    name: actor.name,
    mood: actor.mood,
  }));

  const resetUser = () => {
    store.setUserAsActor();
  };

  const handleSelectActor = user => () => {
    if (isInstructor) store.setUserAsActor(user)
  };

  return <ActorListLayout
    actors={usersAsActor}
    resetUser={resetUser}
    onClick={handleSelectActor}
  />;
};

export default observer(ActorList);
