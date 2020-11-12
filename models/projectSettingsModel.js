import { types, resolveIdentifier } from "mobx-state-tree";

// Models
import ProjectModel from "models/projectModel";

const ProjectSettingsModel = types
  .model("ProjectSettingsModel", {
    projectId: types.maybe(types.string),
    maxPage: types.optional(types.number, 1),
  })
  .views(self => ({
    get project() {
      if (!self.projectId) return undefined;
      
      return resolveIdentifier(ProjectModel, self, self.projectId);
    },
  }));

export default ProjectSettingsModel;
