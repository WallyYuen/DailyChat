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

  const resetUser = () => {
    store.setUserAsActor();
  };

  const handleSelectActor = user => () => {
    if (isInstructor) store.setUserAsActor(user)
  };

  return <ActorListLayout
    actors={store.actors}
    resetUser={resetUser}
    onClick={handleSelectActor}
  />;
};

export default observer(ActorList);
