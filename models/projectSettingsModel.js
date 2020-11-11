import { types, resolveIdentifier } from "mobx-state-tree";

// Models
import ProjectModel from "models/projectModel";

const ProjectSettingsModel = types
  .model("ProjectSettingsModel", {
    projectId: types.string,
    maxPage: types.optional(types.number, 1),
  })
  .views(self => ({
    get project() {
      return resolveIdentifier(ProjectModel, self, self.projectId);
    },
  }));

export default ProjectSettingsModel;
