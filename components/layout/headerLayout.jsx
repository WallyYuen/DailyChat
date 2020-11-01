import React from "react";
import Link from "next/link";

// styles
import layout from "assets/styles/layout/headerLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

// UI
import Hamburger from "components/ui/hamburger";

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
            <span className={layout.username}>{currentUser.name}</span>
            <div>
              <button className={button.neutral} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className={layout.rightProps}>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderLayout;