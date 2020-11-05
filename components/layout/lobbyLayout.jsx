import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Link from "next/link";

// Component
import Avatar from "components/ui/avatar";

// UI
import Button from "components/ui/button";

// Layout
import button from "components/ui/button.module.scss";

// Styling
import layout from "components/layout/lobbyLayout.module.scss";

const LobbyLayout = ({ user }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={layout.frame}>
      <div className={layout.container}>
        <div className={layout.header}>
          <span>The Lobby</span>
        </div>
        <div className={layout.content}>
          <span>Please wait, your invitation is pending</span>
          <div className={layout.avatar}>
            <Avatar
              maxInitials={!user.displayName ? 1 : 2}
              name={user.name}
              image={user.photoURL}
              size={90}
              textSizeRatio={3}
            />
          </div>
          <span className={layout.userName}>{user.name}</span>
        </div>
        <div className={layout.bottom}>  
          <Link href="/">
            <Button className={clsx(button.secondary, layout.button)} label="Back" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(LobbyLayout);