import { types, getParent } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";

const AssignmentModel = types
  .model("AssignmentModel", {
    id: types.optional(types.identifier, () => uuidv4()),
    content: types.string,
    isHovered: false,
    name: types.string,
    page: types.number,
  })
  .actions(self => ({
    update(form) {
      self.content = form.content;
      self.name = form.assignmentName;
      self.page = form.page;
    },
    setPage(value) {
      self.page = value;
    },
    setIsHovered(value) {
      self.isHovered = value;
    },
  }))
  .views(self => ({
    get project() {
      return getParent(self, 2);
    },
  }));

export default AssignmentModel;
