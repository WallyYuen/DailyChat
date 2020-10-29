import React from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import Link from "next/link";

// Component
import Avatar from "components/ui/avatar";

// UI
import Button from "components/ui/button";

// Layout
import button from "assets/styles/ui/button.module.scss";

// Styling
import userLayout from "assets/styles/layout/userLayout.module.scss";

const LobbyLayout = ({ user }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div>
      <div>
        <span>The Lobby</span>
      </div>
      <div>
        <span>Please wait, your invitataion is pending</span>
        <Avatar
          isAnonymous={!user.displayName}
          name={user.name}
          image={user.photoURL}
          size={40}
          textSizeRatio={4}
        />
        <div className={userLayout.content}>
          {user.name}
        </div>
        <Link href="/">
          <Button className={button.neutral} label="Back" />
        </Link>
      </div>
    </div>
  );
};

export default observer(LobbyLayout);