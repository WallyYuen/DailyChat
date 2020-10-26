import React from "react";

const ActorListLayout = ({ actors }) => {
  return (
    <React.Fragment>
      <div className="container">
        <h5>
          Act as
        </h5>
        <div className="dropdown-divider" />
        {actors.map((actor) => (
          <div key={actor.uid}>
            {actor.name}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ActorListLayout;
