import React, { useContext } from "react";
import { observer, useStaticRendering } from "mobx-react";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import ActorListLayout from "components/layout/actorListLayout";

const ActorList = () => {
  useStaticRendering(typeof window === "undefined");
  const { actors } = useContext(ApplicationContext);

  return <ActorListLayout actors={actors} />;
};

export default observer(ActorList);
