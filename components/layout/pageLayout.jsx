import React from "react";

// Components
import Header from "components/container/header";
import Footer from "components/container/footer";

// styles
import layout from "assets/styles/layout/pageLayout.module.scss";

const PageLayout = ({ children }) => {
  return (
    <div className={layout.container}>
      <Header />
        <div className={layout.main}>
          {children}
        </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
