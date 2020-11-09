import React, { useState, useContext, useEffect, useMemo } from "react";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { db } from "lib/firebase";

// Store
import { ApplicationContext } from "stores/applicationStore";

// Model
import AssignmentModel from "models/assignmentModel";

// Styling
import CatalogFormLayout from "components/layout/catalogFormLayout";

const CatalogForm = () => {
  enableStaticRendering(typeof window === "undefined");
  const [writeError, setWriteError] = useState();

  const { catalog } = useContext(ApplicationContext);
  const { form, selectedAssignment } = catalog;

  useEffect(() => () => form.reset(), []);

  const resetSelection = () => {
    catalog.setSelectedAssignment();
  };

  const closeCatalog = () => {
    catalog.setIsOpen(false);
  };

  const setProject = (event) => {
    form.setProject(event.target.value);
    catalog.setSelectedAssignment();
  }

  const setPage = (event) => {
    form.setPage(event.target.value);
  };

  const sortPages = (project) => {
    if (!project) return;

    const page = selectedAssignment?.page ?? project.assignments.length + 1;

    const min = Math.min(form.page, page) - 1;
    const max = Math.max(form.page, page) - 0;

    project.sortedAssignments.slice(min, max).forEach((assignment) => {
      const value = form.page < page ? 1 : -1;

      assignment.setPage(assignment.page + value);
    });
  }

  const pageValues = useMemo(() => {
    const isNew = form.project && !selectedAssignment;
    const value = form.pageValues.length + 1;
    
    return isNew ? [...form.pageValues, { value, label: value }] : form.pageValues;
  }, [form.project, selectedAssignment, form.pageValues]);

  const saveAssignment = () => {
    setWriteError();

    let project = catalog.projects
      .find(project => project.id === (selectedAssignment?.project.id ?? form.project?.id));

    sortPages(project);

    const dbRef = project
      ? db.collection("projects").doc(project.id)
      : db.collection("projects").doc();

    if (selectedAssignment) {
      selectedAssignment.update(form);
    }

    const assignment = selectedAssignment ?? AssignmentModel.create({
      content: form.content,
      name: form.assignmentName,
      page: form.page,
    });

    if (!selectedAssignment && project) {
      project.addAssignment(assignment);
    }

    project = project ?? {
      assignments: [assignment],
      id: dbRef.id,
      name: form.newProjectName,
    };

    dbRef.set(project)
      .then(() => form.resetFields())
      .catch((error) => {
        setWriteError(error.message);
      });
  }

  useEffect(() => {
    if (!form.project || selectedAssignment) return;

    form.setPage(pageValues[pageValues.length - 1].value);
  }, [form.project, selectedAssignment, pageValues]);

  useEffect(() => {
    form.updateForm(selectedAssignment);

    if (!selectedAssignment) form.resetFields();
  }, [selectedAssignment]);

  return <CatalogFormLayout
    projectValues={catalog.projectValues}
    onSave={saveAssignment}
    form={form}
    writeError={writeError}
    setProject={setProject}
    onCancel={closeCatalog}
    assignmentIsSelected={!!selectedAssignment}
    pageValues={pageValues}
    resetSelection={resetSelection}
    setPage={setPage}
  />;
};

export default observer(CatalogForm);
