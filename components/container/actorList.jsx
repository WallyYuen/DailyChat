import React, { useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorListLayout from "components/layout/actorListLayout";

const ActorList = () => {
  enableStaticRendering(typeof window === "undefined");
  const { actors } = useContext(ApplicationContext);

  return <ActorListLayout actors={actors} />;
};

export default observer(ActorList);
