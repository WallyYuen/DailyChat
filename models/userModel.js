import { types } from "mobx-state-tree";
import { roles } from "lib/role";
import { moods } from "lib/mood";

const UserModel = types
  .model("UserModel", {
    uid: types.identifier,
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    isOnline: types.optional(types.boolean, false),
    photoUrl: types.maybeNull(types.string),
    role: types.optional(
      types.enumeration("Role", Object.values(roles)), roles.student,
    ),
    mood: types.optional(
      types.enumeration("Mood", Object.values(moods)), moods.default,
    ),
  })
  .actions(self => ({
    setRole: role => self.role = role ?? roles.student,
    setMood: mood => self.mood = mood ?? moods.default,
  }))
  .views(self => ({
    get name() {
      return self.displayName ?? `Anonymous (${self.email})`;
    },
  }));

export default UserModel;
