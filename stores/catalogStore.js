import { types, resolveIdentifier } from "mobx-state-tree";

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
    activeProjectId: types.maybe(types.string),
    maxPage: types.optional(types.number, 1),
  })
  .actions(self => ({
    setProjects(projects) {
      const projectsWithAssignments = projects.filter(project => project.assignments.length > 0);

      self.projects = projectsWithAssignments;
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
    setActiveProjectId(projectId) {
      self.activeProjectId = projectId;
    },
    setMaxPage(value) {
      self.maxPage = value;
    },
    setReadError(error) {
      self.readError = error;
    },
  }))
  .views(self => ({
    get projectValues() {
      const values = self.projects?.map(project => ({ value: project.id, label: project.name }));

      return [{ value: 0, label: "New project" }, ...values];
    },
    get activeProject() {
      if (!self.activeProjectId) return undefined;
      
      return resolveIdentifier(ProjectModel, self, self.activeProjectId);
    },
  }));

export default CatalogStore;
