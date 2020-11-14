import React, { useContext, useEffect } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

import CatalogListLayout from "components/layout/catalogListLayout";

// TODO: Projects should be able to be deleted
const CatalogList = () => {
  enableStaticRendering(typeof window === "undefined");
  const setPage = (assignment, index) => assignment.setPage(index + 1);
  
  const { catalog } = useContext(ApplicationContext);
  const { projects, setSelectedAssignment, selectedAssignment } = catalog;

  const handleRemoveAssignment = (assignment) => (event) => {
    event.stopPropagation(); // TODO: Bad practise to use stopPropagation

    const { project } = assignment;
    const assignments = project.sortedAssignments.filter(a => a.id !== assignment.id);

    assignments.forEach(setPage);

    db.collection("projects")
      .doc(project.id)
      .set({ assignments })
      .catch((error) => {
        throw new Error(`Failed to remove assignment, ${error}`);
      });
  };

  const handleSelectAssignment = (assignment) => () => {
    setSelectedAssignment(assignment.id)
  };

  const handleDeleteVisibility = (assignment) => (event) => {
    const value = { mouseenter: true, mouseleave: false }[event.type];

    assignment.setIsHovered(value ?? false);
  };

  useEffect(() => () => setSelectedAssignment(), []);

  return (
    <CatalogListLayout
      handleSelectAssignment={handleSelectAssignment}
      projects={projects}
      selectedAssignmentId={selectedAssignment?.id}
      handleDeleteVisibility={handleDeleteVisibility}
      handleRemoveAssignment={handleRemoveAssignment}
    />
  );
};

export default observer(CatalogList);