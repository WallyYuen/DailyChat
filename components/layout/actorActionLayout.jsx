import React from "react";
import { moods } from "lib/mood";

// UI
import Button from "components/ui/button";

const ActorListLayout = ({ onClick }) => {
  return (
    <div className="container">
      <h5>
        Actor actions
      </h5>
      <div className="dropdown-divider" />
      <div>
        <Button label="Normaal" value={moods.default} onClick={onClick} />
        <Button label="Blij" value={moods.happy} onClick={onClick} />
        <Button label="Boos" value={moods.angry} onClick={onClick} />
        <Button label="Onverschillig" value={moods.indifferent} onClick={onClick} />
      </div>
    </div>
  );
};

export default ActorListLayout;
