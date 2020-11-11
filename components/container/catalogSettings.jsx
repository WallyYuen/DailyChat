import React, { useState, useEffect, useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { hideAll } from "tippy.js";

// Layout
import CatalogSettingsLayout from "components/layout/catalogSettingsLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const CatalogSettings = ({ modalCallback }) => {
  enableStaticRendering(typeof window === "undefined");
  const { catalog } = useContext(ApplicationContext);

  const [projectId, setProjectId] = useState();
  const [maxPage, setMaxPage] = useState(1);

  const projectOptions = catalog.projects.map(project => ({
    value: project.id,
    label: project.name
  }));

  const selectedProject = catalog.projects.find(project => project.id === projectId) ?? catalog.activeProject?.id ?? catalog.projects[0];
  const assignments = selectedProject?.sortedAssignments ?? [];
  const maxPageOptions = assignments.map((assignment, index) => ({ value: assignment.page, label: `${index + 1}. ${assignment.name}` }));

  modalCallback(() => () => {
    setProjectId(catalog.activeProject?.id ?? catalog.projects[0]);
    setMaxPage(catalog.maxPage);
  });

  const onAccept = () => {
    catalog.setMaxPage(maxPage);
    catalog.setActiveProject(projectId);

    hideAll();
  };

  const onCancel = () => {
    hideAll();
  };

  const handleSelectProject = (event) => {
    const { value } = event.target;
    setProjectId(value);
    setMaxPage(1);
  };

  const handleSelectMaxPage = (event) => {
    const { value } = event.target;
    setMaxPage(value);
  };

  return (
    <CatalogSettingsLayout
      projectValue={projectId}
      maxPageValue={maxPage}
      setProject={handleSelectProject}
      setMaxPage={handleSelectMaxPage}
      onAccept={onAccept}
      onCancel={onCancel}
      projectOptions={projectOptions}
      maxPageOptions={maxPageOptions}
    />
  );
};

export default observer(CatalogSettings);
