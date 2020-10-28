import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";

const ActorListLayout = ({ actors, onClick, resetUser }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div>
      <h3>
        Act as
      </h3>
      <div />
      <Button label="Reset user" onClick={resetUser} />
      {actors.map((actor) => (
        <div key={actor.uid} onClick={onClick(actor)}>
          {`${actor.name}, ${actor.mood}`}
        </div>
      ))}
    </div>
  );
};

export default observer(ActorListLayout);
