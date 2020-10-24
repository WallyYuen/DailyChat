import React from "react";
import { auth, userDb } from "../../lib/firebase";

// Layout
import HeaderLayout from "../layout/headerLayout";

const Header = () => {
  const { currentUser } = auth();

  const handleLogout = async () => {
    await userDb.ref(`users/${currentUser.uid}`)
      .update({ isOnline: false })
      .then(() => auth().signOut())
      .catch(error => {
        throw new Error(`Failed to set user to offline, ${error}`);
      });
  };

  return (
    <HeaderLayout currentUser={currentUser} handleLogout={handleLogout} />
  );
};

export default Header;