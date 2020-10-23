import { types } from "mobx-state-tree";

const UserModel = types
  .model("UserModel", {
    uid: types.identifier,
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    isOnline: types.optional(types.boolean, false),
    photoURL: types.maybeNull(types.string),
  })
  .views(self => ({
    get name() {
      return self.displayName ?? "Wolverine";
    },
  }));

export default UserModel;
