import React from "react";
import Link from "next/link";

// UI
import Button from "components/ui/button";
import Hamburger from "components/ui/hamburger";

// styles
import layout from "components/layout/headerLayout.module.scss";
import button from "components/ui/button.module.scss";

const HeaderLayout = ({ currentUser, handleLogout, toggleMenu, isMenuOpen }) => {
  return (
    <header className={layout.container}>
      <nav className={layout.nav}>
        <Link href="/">Daily Chat</Link>
        <div className={layout.menu}>
          <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
        {currentUser ? (
          <div className={layout.rightProps}>
            <span>{currentUser.name}</span>
            <Button label="Logout" className={button.neutral} onClick={handleLogout} />
          </div>
        ) : (
          <div className={layout.rightProps}>
            <Link href="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderLayout;