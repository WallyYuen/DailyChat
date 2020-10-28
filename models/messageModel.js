import { types, getParent } from "mobx-state-tree";

// Models
import UserModel from "models/userModel";

const MessageModel = types
  .model("MessageModel", {
    id: types.identifier,
    userId: types.string,
    content: types.string,
    timestamp: types.number,
  })
  .views(self => ({
    get createdBy() {
      return self.user?.name ?? "Deleted";
    },
    get user() {
      return getParent(self, 2).users.find(user => user.uid === self.userId);
    },
  }));

export default MessageModel;
