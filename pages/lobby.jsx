import React, { useContext } from "react";
import { useRouter } from "next/router";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { roles } from "lib/role";

// Layout
import LobbyLayout from "components/layout/lobbyLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const Lobby = () => {
  if (typeof window === "undefined") return null;
  enableStaticRendering(typeof window === "undefined");

  const router = useRouter();
  const { currentUser, isAuthenticated } = useContext(ApplicationContext);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (currentUser.role !== roles.student || currentUser.approved) {
    router.push("/dashboard");
    return null;
  }

  return (
    <LobbyLayout user={currentUser} />
  );
};

export default observer(Lobby);
