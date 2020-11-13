import React, { forwardRef } from "react";
import clsx from "clsx";
import { getMoodColor } from "lib/mood";
import { roles } from "lib/role";

// Component
import Avatar from "components/ui/avatar";

// Styling
import layout from "components/layout/userLayout.module.scss";

const UserLayout = ({ isAnonymous, name, mood, role, image, isSelected, ...props }, ref) => {
  const moodColor = getMoodColor(mood);

  const container = clsx(
    layout.neutral,
    layout.frame,
    { [layout.isSelected]: isSelected },
  );

  return (
    <div className={container} {...props} ref={ref}>
      <Avatar
        name={name}
        src={image}
        maxInitials={isAnonymous ? 1 : 2}
      />
      <div className={layout.content}>
        <span>{name}</span>
      </div>
      {role === roles.actor && (
        <div className={layout.mood} style={{ background: moodColor }}></div>
      )}
    </div>
  );
};

export default forwardRef(UserLayout);
