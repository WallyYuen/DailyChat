import React, { useState, useEffect, useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { hideAll } from "tippy.js";

// Layout
import CatalogSettingsLayout from "components/layout/catalogSettingsLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const CatalogSettings = ({ modalCallback }) => {
  const { catalog, catalog: { projects } } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const [maxPage, setMaxPage] = useState(1);
  const [projectId, setProjectId] = useState();

  const projectOptions = catalog.projects.map(project => ({
    value: project.id,
    label: project.name
  }));

  const defaultProject = projects.length > 0 ? projects[0] : undefined;
  const activeProject = catalog.activeProject ?? defaultProject;

  const selectedProject = projects.find(project => project.id === (projectId ?? activeProject?.id));
  const assignments = selectedProject?.sortedAssignments ?? [];
  
  const maxPageOptions = assignments.map((assignment, index) => ({
    value: assignment.page,
    label: `${index + 1}. ${assignment.name}`,
  }));

  useEffect(() => {
    const callback = () => {
      setProjectId(activeProject?.id);
      setMaxPage(catalog.maxPage);
    };

    modalCallback(() => callback);
  }, [activeProject, catalog.maxPage]);

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
