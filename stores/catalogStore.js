import { types, getRoot } from "mobx-state-tree";

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
    readError: types.maybe(types.string),
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
    setReadError(error) {
      self.readError = error;
    },
  }))
  .views(self => ({
    get projectSettings() {
      return getRoot(self).setting.projectSettings;
    },
    get projectValues() {
      const values = self.projects?.map(project => ({ value: project.id, label: project.name }));

      return [{ value: 0, label: "New project" }, ...values];
    },
    get activeProject() {
      return self.projectSettings.project;
    },
    get maxPage() {
      return self.projectSettings.maxPage;
    },
  }));

export default CatalogStore;
