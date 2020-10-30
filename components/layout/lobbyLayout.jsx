import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Link from "next/link";

// Component
import Avatar from "components/ui/avatar";

// UI
import Button from "components/ui/button";

// Layout
import button from "assets/styles/ui/button.module.scss";

// Styling
import lobbyLayout from "assets/styles/layout/lobbyLayout.module.scss";

const LobbyLayout = ({ user }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={lobbyLayout.frame}>
      <div className={lobbyLayout.container}>
        <div className={lobbyLayout.header}>
          <span>The Lobby</span>
        </div>
        <div className={lobbyLayout.content}>
          <span>Please wait, your invitation is pending</span>
          <div className={lobbyLayout.avatar}>
            <Avatar
              maxInitials={!user.displayName ? 1 : 2}
              name={user.name}
              image={user.photoURL}
              size={90}
              textSizeRatio={3}
            />
          </div>
          <span className={lobbyLayout.userName}>{user.name}</span>
        </div>
        <div className={lobbyLayout.bottom}>  
          <Link href="/">
            <Button className={clsx(button.neutral, button.fullWidth)} label="Back" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(LobbyLayout);