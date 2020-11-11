import React, { useContext } from "react";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CatalogEditorLayout from "components/layout/catalogEditorLayout";

const CatalogEditor = () => {
  const { catalog } = useContext(ApplicationContext);

  return <CatalogEditorLayout readError={catalog.readError} />;
};

export default CatalogEditor;