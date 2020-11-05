import React from "react";

// Layout
import CatalogManagerLayout from "components/layout/catalogManagerLayout";

const CatalogManager = ({ onCancel }) => {
  return <CatalogManagerLayout onCancel={onCancel} />;
};

export default CatalogManager;