import React, { useState, useContext } from "react";
import { logout } from "lib/auth";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import HeaderLayout from "components/layout/headerLayout";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(ApplicationContext);

  const handleLogout = async () => {
    await logout(currentUser);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderLayout
      currentUser={currentUser}
      handleLogout={handleLogout}
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
    />
  );
};

export default Header;