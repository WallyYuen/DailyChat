import { types } from "mobx-state-tree";

// Models
import ProjectSettingsModel from "models/projectSettingsModel";
import DashboardSettingsModel from "models/dashboardSettingsModel";

export const SettingStore = types
  .model("SettingStore", {
    dashboardSettings: types.optional(DashboardSettingsModel, {}),
    projectSettings: types.optional(ProjectSettingsModel, {}),
    readError: types.maybe(types.string),
  })
  .actions(self => ({
    setup: (type, data) => self[type] = data,
  }));

export default SettingStore;
