import React from "react";

// layout
import FooterLayout from "components/layout/footerLayout";

const Footer = () => {
  const year = new Date().getFullYear();
  const copyright = "\u00A9";

  const footer = `${copyright} Daily Chat ${year}.`;
  
  return <FooterLayout footer={footer} />;
};

export default Footer;