import React from "react";
import Link from "next/link";

const HeaderLayout = ({ currentUser, handleLogout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" href="/">Daily Chat</Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {currentUser
            ? <div className="navbar-nav">
              <button className="btn btn-primary mr-3" onClick={handleLogout}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" href="/login">Login</Link>
              <Link className="nav-item nav-link mr-3" href="/register">Register</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
};

export default HeaderLayout;