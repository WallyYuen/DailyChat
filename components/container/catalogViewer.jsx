import React, { useState, useEffect, useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Layout
import CatalogViewerLayout from "components/layout/catalogViewerLayout";

const CatalogEditor = () => {
  enableStaticRendering(typeof window === "undefined");

  const { catalog } = useContext(ApplicationContext);
  const { activeProject, maxPage } = catalog;

  const [currentPage, setCurrentPage] = useState(1);
  const [readError, setReadError] = useState();

  const assignments = activeProject?.sortedAssignments ?? [];
  const assignment = assignments[currentPage - 1];

  const closeCatalog = () => {
    catalog.setViewerIsOpen(false);
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, Math.max(Math.min(maxPage, assignments.length), 1)));
  };

  const handlePrevious = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };
  
  useEffect(() => {
    const unsubscribe = db.collection("projects").onSnapshot((snapshot) => {
      catalog.setProjects(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      setReadError(error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => setCurrentPage(Math.min(maxPage, currentPage)), []);

  return (
    <CatalogViewerLayout
      readError={readError}
      assignment={assignment}
      currentPage={currentPage}
      maxPage={maxPage}
      totalPages={assignments?.length ?? 1}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      closeCatalog={closeCatalog}
    />
  );
};

export default observer(CatalogEditor);