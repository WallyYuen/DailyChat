import React, { useMemo } from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Avatar from "react-avatar";
import { getMoodColor } from "lib/mood";

// Styling
import cell from "assets/styles/ui/userCell.module.scss";

const randomColor = () => {
  const darkTextColor = "rgb(66, 66, 66)";
  const defaultTextColor = "white";

  const colors = [
    {
      avatarBackgroundColor: "SteelBlue",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "Tomato",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "SandyBrown",
      avatarTextColor: darkTextColor,
    },
    {
      avatarBackgroundColor: "MediumSeaGreen",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "LightSlateGray",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "LightBlue",
      avatarTextColor: darkTextColor,
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
        style={{
          fontSize: "10px",
          border: `1px solid ${moodColor}`,
        }}
      />
      <div className={cell.content}>
        {user.name}
      </div>
    </div>
  );
};

export default observer(UserCell);
