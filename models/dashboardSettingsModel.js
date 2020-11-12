import { types } from "mobx-state-tree";

const DashboardSettingsModel = types
  .model("DashboardSettingsModel", {
    callIsActive: false,
  });

export default DashboardSettingsModel;
