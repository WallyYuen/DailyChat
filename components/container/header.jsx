import React, { useContext } from "react";
import { logout } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import HeaderLayout from "components/layout/headerLayout";

const Header = () => {
  const { currentUser } = useContext(ApplicationContext);

  const handleLogout = async () => {
    await logout(currentUser);
  };

  return (
    <HeaderLayout currentUser={currentUser} handleLogout={handleLogout} />
  );
};

export default Header;