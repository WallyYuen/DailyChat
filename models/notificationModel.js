import { types, resolveIdentifier } from "mobx-state-tree";

// Models
import UserModel from "models/userModel";

const NotificationModel = types
  .model("NotificationModel", {
    type: types.string,
    receiverId: types.maybe(types.string),
    senderId: types.string,
  })
  .views(self => ({
    get sender() {
      return resolveIdentifier(UserModel, self, self.senderId);
    },
    get receiver() {
      if (!self.receiverId) return undefined;
      
      return resolveIdentifier(UserModel, self, self.receiverId);
    },
  }));

export default NotificationModel;
