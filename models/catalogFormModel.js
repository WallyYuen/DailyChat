import { types, getParent } from "mobx-state-tree";

// Models
import ProjectModel from "models/projectModel";

const isEmpty = (value) => (value?.length ?? 0) <= 0;

const CatalogFormModel = types
  .model("CatalogFormModel", {
    project: types.safeReference(ProjectModel),
    newProjectName: types.optional(types.string, ""),
    page: types.optional(types.number, 1),
    assignmentName: types.optional(types.string, ""),
    content: types.optional(types.string, ""),
  })
  .actions(self => ({
    setNewProjectName(event) {
      self.newProjectName = event.target.value;
    },
    setPage(value) {
      const page = typeof value === "string" ? Number.parseInt(value, 10) : value;

      if (typeof page !== "number") return;

      self.page = page;
    },
    setAssignmentName(event) {
      self.assignmentName = event.target.value;
    },
    setContent(event) {
      self.content = event.target.value;
    },
    setProject(projectId) {
      const project = self.projects.find(project => project.id === projectId);

      self.project = project?.id;
    },
    reset() {
      self.project = undefined;
      self.newProjectName = "";
      self.page = 1;
      self.assignmentName = "";
      self.content = "";
    },
    resetFields() {
      self.newProjectName = "";
      self.assignmentName = "";
      self.content = "";
    },
    updateForm(assignment) {
      if (!assignment) return;

      self.project = assignment.project.id;
      self.page = assignment.page;
      self.assignmentName = assignment.name;
      self.content = assignment.content;
    },
  }))
  .views(self => ({
    get projects() {
      return getParent(self).projects;
    },
    get pageValues() {
      return self.project?.pageValues ?? [{ value: 1, label: 1 }];
    },
    get canBeSaved() {
      return !isEmpty(self.projectName) && !isEmpty(self.assignmentName) && !isEmpty(self.content);
    },
    get projectName() {
      return self.project?.name ?? self.newProjectName;
    },
  }));

export default CatalogFormModel;
