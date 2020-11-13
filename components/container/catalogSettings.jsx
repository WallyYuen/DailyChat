import React, { useState, useEffect, useContext } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { hideAll } from "tippy.js";
import { db } from "lib/firebase";

// Layout
import CatalogSettingsLayout from "components/layout/catalogSettingsLayout";

// Store
import { ApplicationContext } from "stores/applicationStore";

const toNumber = (value) => {
  return typeof value === "string" ? Number.parseInt(value, 10) : value;
};

// TODO: create modal component
const CatalogSettings = ({ modalCallback }) => {
  const { catalog, catalog: { projects } } = useContext(ApplicationContext);
  enableStaticRendering(typeof window === "undefined");

  const [maxPage, setMaxPage] = useState();
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
    hideAll();

    if (!selectedProject) return;

    const settings = {
      projectId: selectedProject.id,
      maxPage: toNumber(maxPage ?? catalog.maxPage)
    };

    db.collection("settings")
      .doc("projectSettings")
      .set(settings)
      .catch((error) => {
        throw new Error(`Failed to save project settings, ${error}`);
      });
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
      setProject={handleSelectProject}
      setMaxPage={handleSelectMaxPage}
      onAccept={onAccept}
      onCancel={onCancel}
      projectValue={selectedProject?.id}
      maxPageValue={maxPage ?? catalog.maxPage}
      projectOptions={projectOptions}
      maxPageOptions={maxPageOptions}
    />
  );
};

export default observer(CatalogSettings);
