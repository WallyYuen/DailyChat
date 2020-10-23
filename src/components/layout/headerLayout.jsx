import React from "react";
import { Link } from "react-router-dom";

const HeaderLayout = ({ currentUser, handleLogout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">Daily Chat</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/chat">Profile</Link>
              <button className="btn btn-primary mr-3" onClick={handleLogout}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/login">Login</Link>
              <Link className="nav-item nav-link mr-3" to="/signup">Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
};

export default HeaderLayout;