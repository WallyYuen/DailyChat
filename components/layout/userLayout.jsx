import React from "react";
import clsx from "clsx";
import { getMoodColor } from "lib/mood";

// Component
import Avatar from "components/ui/avatar";

// Styling
import userLayout from "assets/styles/layout/userLayout.module.scss";

const UserLayout = ({ isAnonymous, name, mood, role, image, ...props }) => {
  const moodColor = getMoodColor(mood);

  return (
    <div className={clsx(userLayout.frame, userLayout.neutral)} {...props}>
      <Avatar
        name={name}
        src={image}
        maxInitials={isAnonymous ? 1 : 2}
      />
      <div className={userLayout.content}>
        <span>{name}</span>
      </div>
      {role === "actor" && (
        <div className={userLayout.mood} style={{ background: moodColor }}></div>
      )}
    </div>
  );
};

export default UserLayout;
