import React from "react";

// styles
import layout from "assets/styles/layout/footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  const copyright = "\u00A9";
  
  return (
    <footer className={layout.container}>
      <div>
        <span>{`${copyright} Daily Chat ${year}.`}</span>
      </div>
    </footer>
  )
};

export default Footer;