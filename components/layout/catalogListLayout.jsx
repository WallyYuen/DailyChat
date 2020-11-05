import React from "react";

import layout from "components/layout/catalogListLayout.module.scss";

const CatalogListLayout = () => {
  return (
    <div className={layout.container}>
      <div className={layout.header}>
        Casus De Groot Pillen en Poeders
      </div>
      <div className={layout.casus}>
        Deel 1: Basis Casus
      </div>
      <div className={layout.casus}>
        Deel 2: Casus behorende bij opdracht 2 rol binnen bedrijf
      </div>
      <div className={layout.casus}>
        Deel 3: Casus behorende bij opdracht 4: Er is iets mis!
      </div>
    </div>
  );
};

export default CatalogListLayout;