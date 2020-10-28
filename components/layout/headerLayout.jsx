import React from "react";
import Link from "next/link";

// styles
import layout from "assets/styles/layout/headerLayout.module.scss";
import button from "assets/styles/ui/button.module.scss";

const HeaderLayout = ({ currentUser, handleLogout }) => {
  return (
    <header className={layout.container}>
      <nav className={layout.nav}>
        <Link href="/">Daily Chat</Link>
        {currentUser
          ? <div>
            <button className={button.neutral} onClick={handleLogout}>Logout</button>
          </div>
          : <div>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>}
      </nav>
    </header>
  );
};

export default HeaderLayout;