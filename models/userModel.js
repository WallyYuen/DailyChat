import { types } from "mobx-state-tree";
import { roles } from "lib/role";
import { moods } from "lib/mood";

const UserModel = types
  .model("UserModel", {
    uid: types.identifier,
    displayName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    isOnline: types.optional(types.boolean, false),
    approved: types.optional(types.boolean, false),
    photoURL: types.maybeNull(types.string),
    role: types.optional(
      types.enumeration("Role", Object.values(roles)), roles.student,
    ),
    mood: types.optional(
      types.enumeration("Mood", Object.values(moods)), moods.default,
    ),
  })
  .views(self => ({
    get isContact() {
      return self.approved || ![roles.actor, roles.student].includes(self.role);
    },
    get name() {
      return self.displayName ?? `Anonymous (${self.email})`;
    },
    get hasInstructorRights() {
      return [roles.admin, roles.instructor].includes(self.role);
    },
  }));

export default UserModel;
