import { types } from "mobx-state-tree";

// Models
import ProjectSettingsModel from "models/projectSettingsModel";

export const SettingStore = types
  .model("SettingStore", {
    projectSettings: types.maybe(ProjectSettingsModel),
    readError: types.maybe(types.string),
  })
  .actions(self => ({
    setup: (type, data) => self[type] = data,
  }));

export default SettingStore;
