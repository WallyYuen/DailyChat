import React from "react";

// styles
import layout from "components/layout/footerLayout.module.scss";

const Footer = ({ footer }) => {
  return (
    <footer className={layout.container}>
      <div>
        <span>{footer}</span>
      </div>
    </footer>
  )
};

export default Footer;