import React from "react";
import clsx from "clsx";

// Styling
import menu from "assets/styles/ui/hamburger.module.scss";

const Hamburger = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div type="button" className={menu.hamburger} onClick={toggleMenu}>
      <span className={clsx({ [menu.open]: isMenuOpen })} />
      <span className={clsx({ [menu.open]: isMenuOpen })} />
      <span className={clsx({ [menu.open]: isMenuOpen })} />
    </div>
  );
};

export default Hamburger;
