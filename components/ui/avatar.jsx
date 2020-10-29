import React, { useMemo } from "react";
import ReactAvatar from "react-avatar";

const randomColor = () => {
  const defaultTextColor = "hsl(0, 0%, 25%)";

  const colors = [
    {
      avatarBackgroundColor: "lightSkyBlue",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "peachPuff",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "lightGoldenRodYellow",
      avatarTextColor: defaultTextColor,
    },
    {
      avatarBackgroundColor: "lightCoral",
      avatarTextColor: defaultTextColor,
    },
  ];

  const index = Math.floor(Math.random() * colors.length)

  return colors[index];
};

const Avatar = (props) => {
  const { avatarBackgroundColor, avatarTextColor } = useMemo(() => randomColor(), []);

  return (
    <ReactAvatar
      color={avatarBackgroundColor}
      fgColor={avatarTextColor}
      textSizeRatio={4}
      round
      size={40}
      {...props}
    />
  );
};

export default Avatar;
