import { types } from "mobx-state-tree";

// Models
import ProjectModel from "models/projectModel";
import CatalogFormModel from "models/catalogFormModel";
import AssignmentModel from "models/assignmentModel";

export const CatalogStore = types
  .model("CatalogStore", {
    projects: types.array(ProjectModel),
    form: types.optional(CatalogFormModel, {}),
    editorIsOpen: false,
    viewerIsOpen: false,
    selectedAssignment: types.safeReference(AssignmentModel),
    activeProject: types.safeReference(ProjectModel),
    maxPage: types.optional(types.number, 1),
  })
  .actions(self => ({
    setProjects(projects) {
      self.projects = projects;
    },
    setSelectedAssignment(id) {
      self.selectedAssignment = id;
    },
    setEditorIsOpen(value) {
      self.editorIsOpen = value;
    },
    setViewerIsOpen(value) {
      self.viewerIsOpen = value;
    },
    setActiveProject(projectId) {
      self.activeProject = projectId;
    },
    setMaxPage(value) {
      self.maxPage = value;
    },
  }))
  .views(self => ({
    get projectValues() {
      const values = self.projects?.map(project => ({ value: project.id, label: project.name }));

      return [{ value: 0, label: "New project" }, ...values];
    },
  }));

export default CatalogStore;
