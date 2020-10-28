import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";

// Layout
import style from "assets/styles/layout/actorListLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const ActorListLayout = ({ actors, onClick, resetUser }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={style.container}>
      <h3>
        Act as
      </h3>
      <div />
      <Button className={button.neutral} label="Reset user" onClick={resetUser} />
      {actors.map((actor) => (
        <div key={actor.uid} onClick={onClick(actor)}>
          <Button className={button.important} label={`${actor.name}, ${actor.mood}`} />
        </div>
      ))}
    </div>
  );
};

export default observer(ActorListLayout);
