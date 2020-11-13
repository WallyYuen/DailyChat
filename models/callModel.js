import { types, resolveIdentifier } from "mobx-state-tree";

// Models
import UserModel from "models/userModel";

const CallModel = types
  .model("CallModel", {
    callerId: types.string,
    receiverId: types.string,
  })
  .views(self => ({
    get caller() {
      return resolveIdentifier(UserModel, self, self.callerId);
    },
    get receiver() {
      return resolveIdentifier(UserModel, self, self.receiverId);
    }
  }));

export default CallModel;
