import React, { useState, useEffect, useContext } from "react";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CatalogEditorLayout from "components/layout/catalogEditorLayout";

const CatalogEditor = () => {
  const { catalog } = useContext(ApplicationContext);
  const [readError, setReadError] = useState();
  
  useEffect(() => {
    const unsubscribe = db.collection("projects").onSnapshot((snapshot) => {
      catalog.setProjects(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      setReadError(error);
    });

    return () => unsubscribe();
  }, []);

  return <CatalogEditorLayout readError={readError} />;
};

export default CatalogEditor;