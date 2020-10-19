import { types } from "mobx-state-tree";

const UserModel = types
  .model("UserModel", {
    uid: types.identifier,
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    photoURL: types.maybeNull(types.string),
  });

export default UserModel;
