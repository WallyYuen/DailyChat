import { types } from "mobx-state-tree";

// Models
import ProjectSettingsModel from "models/projectSettingsModel";
import DashboardSettingsModel from "models/dashboardSettingsModel";
import CallModel from "models/callModel";

export const SettingStore = types
  .model("SettingStore", {
    callSettings: types.maybe(CallModel),
    dashboardSettings: types.optional(DashboardSettingsModel, {}),
    projectSettings: types.optional(ProjectSettingsModel, {}), // TODO: Change this to types.maybe
    readError: types.maybe(types.string),
  })
  .actions(self => ({
    setup({ type, key, data }) {
      self[key] = (type === "removed") ? undefined : data;
    },
    setReadError: error => self.readError = error,
  }));

export default SettingStore;
