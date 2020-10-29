import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { userDb } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorActionLayout from "components/layout/actorActionLayout";

const ActorAction = () => {
  enableStaticRendering(typeof window === "undefined");
  const { userAsActor } = useContext(ApplicationContext);

  const setActorMood = async (event) => {
    const mood = event.target.value;
    userAsActor?.setMood(mood);

    await userDb.ref(`users/${userAsActor.uid}`)
      .update({ mood })
      .catch(error => {
        throw new Error(`Failed to set mood for actors, ${error}`);
      });
  };

  const ActorAction = <ActorActionLayout onClick={setActorMood} />;

  return userAsActor ? ActorAction : null;
};

export default observer(ActorAction);
