import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorActionLayout from "components/layout/actorActionLayout";

const ActorAction = () => {
  enableStaticRendering(typeof window === "undefined");
  const { userAsActor } = useContext(ApplicationContext);

  const setActorMood = (event) => {
    const mood = event.target.value;
    userAsActor?.setMood(mood);
  };

  const ActorAction = <ActorActionLayout onClick={setActorMood} />;

  return userAsActor ? ActorAction : null;
};

export default observer(ActorAction);
