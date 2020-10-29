import React from "react";
import { moods } from "lib/mood";

// UI
import Button from "components/ui/button";

// Layout
import layout from "assets/styles/layout/actorActionLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const ActorListLayout = ({ onClick }) => {
  return (
    <div className={layout.container}>
      <h3>
        Change your mood
      </h3>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="Happy" value={moods.default} onClick={onClick} />
        <Button className={button.neutral} label="Angry" value={moods.angry} onClick={onClick} />
        <Button className={button.neutral} label="Confused" value={moods.confused} onClick={onClick} />
        <Button className={button.neutral} label="Irritated" value={moods.irritated} onClick={onClick} />
      </div>
    </div>
  );
};

export default ActorListLayout;
