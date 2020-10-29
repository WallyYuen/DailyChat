import React, { useMemo } from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Avatar from "react-avatar";
import { getMoodColor } from "lib/mood";

// Styling
import cell from "assets/styles/ui/userCell.module.scss";

const randomColor = () => {
  const defaultTextColor = "hsl(0, 0%, 25%)";

  const colors = [
    {
      avatarBackgroundColor: "Lightskyblue",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "Peachpuff",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "Lightgoldenrodyellow",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "Lightcoral",
      avatarTextColor: defaultTextColor,
    },
  ];

  const index = Math.floor(Math.random() * colors.length)

  return colors[index];
};

const UserCell = ({ user, ...props }) => {
  enableStaticRendering(typeof window === "undefined");
  const { avatarBackgroundColor, avatarTextColor } = useMemo(() => randomColor(), []);

  const moodColor = getMoodColor(user.mood);
  const isAnonymous = user.displayName ? false : true;

  return (
    <div className={clsx(cell.frame, cell.neutral)} {...props}>
      <Avatar
        color={avatarBackgroundColor}
        fgColor={avatarTextColor}
        name={user.name}
        textSizeRatio={4}
        round
        src={user.photoURL}
        size={40}
        maxInitials={isAnonymous ? 1 : 2}
      />
      <div className={cell.content}>
        {user.name}, {user.mood}
      </div>
      {user.role === "actor" && (
        <div className={cell.mood} style={{ background: moodColor }}></div>
      )}
    </div>
  );
};

export default observer(UserCell);
