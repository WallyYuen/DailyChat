import { types } from "mobx-state-tree";

const UserModel = types
  .model("UserModel", {
    uid: types.identifier,
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    isOnline: types.optional(types.boolean, false),
    photoURL: types.maybeNull(types.string),
    role: types.optional(
      types.enumeration("Role", ["admin", "instructor", "actor", "student"]), "student",
    ),
  })
  .actions(self => ({
    setRole: role => self.role = role ?? "student",
  }))
  .views(self => ({
    get name() {
      return self.displayName ?? `Anonymous (${self.email})`;
    },
  }));

export default UserModel;
