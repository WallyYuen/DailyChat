import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";
import UserCell from "components/ui/userCell";

// Styles
import style from "assets/styles/layout/actorListLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const ActorListLayout = ({ actors, onClick, resetUser }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Act as</h3>
        <Button className={clsx(button.neutral, button.small)} label="Reset" onClick={resetUser} />
      </div>
      <div>
        {actors.map((actor) => (
          <UserCell user={actor} key={actor.uid} onClick={onClick(actor)} />
        ))}
      </div>
    </div>
  );
};

export default observer(ActorListLayout);
