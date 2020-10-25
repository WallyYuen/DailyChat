import React from "react";
import { auth } from "lib/firebase";
import { logout } from "lib/auth";

// Layout
import HeaderLayout from "components/layout/headerLayout";

const Header = () => {
  const { currentUser } = auth();

  const handleLogout = async () => {
    await logout(currentUser);
  };

  return (
    <HeaderLayout currentUser={currentUser} handleLogout={handleLogout} />
  );
};

export default Header;