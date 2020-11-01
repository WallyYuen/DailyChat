import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";
import UserLayout from "components/layout/userLayout";

// Styles
import style from "assets/styles/layout/actorListLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const ActorListLayout = ({ actors, onClick, resetUser }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>Act as</span>
        <Button className={clsx(button.neutral, button.small)} label="Reset" onClick={resetUser} />
      </div>
      <div>
        {actors.map((actor) => {
          const isAnonymous = !actor.displayName;

          return (
            <UserLayout
              isAnonymous={isAnonymous}
              name={actor.name}
              key={actor.uid}
              image={actor.photoURL}
              mood={actor.mood}
              role={actor.role}
              onClick={onClick(actor)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default observer(ActorListLayout);
