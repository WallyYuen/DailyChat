import React from "react";
import { auth, db } from "../../lib/firebase";

// Layout
import HeaderLayout from "../layout/headerLayout";

const Header = () => {
  const { currentUser } = auth();

  const handleLogout = async () => {
    await db.collection("users")
      .doc(currentUser.email)
      .set({ isOnline: false }, { merge: true })
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