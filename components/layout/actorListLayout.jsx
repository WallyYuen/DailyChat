import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";
import UserRowLayout from "components/layout/userRowLayout";

// Styles
import layout from "components/layout/actorListLayout.module.scss";
import button from "components/ui/button.module.scss";

const ActorListLayout = ({ actors, selectedActorId, onClick, resetUser, isInstructor }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={layout.container}>
      {isInstructor && (
        <div className={layout.header}>
          <span>Act as</span>
          <Button
            className={button.neutral}
            label="Reset"
            size="small"
            onClick={resetUser}
          />
        </div>
      )}
      <div>
        {actors.map((actor) => {
          const isSelected = actor.uid === selectedActorId;
          const isAnonymous = !actor.displayName;

          return (
            <UserRowLayout
              isAnonymous={isAnonymous}
              name={actor.name}
              key={actor.uid}
              isSelected={isSelected}
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
