import { types } from "mobx-state-tree";

// Models
import UserModel from "models/userModel";

const MessageModel = types
  .model("MessageModel", {
    id: types.identifier,
    user: types.maybe(types.reference(UserModel)),
    content: types.string,
    timestamp: types.number,
  })
  .views(self => ({
    get createdBy() {
      return self.user?.name ?? "Deleted";
    },
  }));

export default MessageModel;
