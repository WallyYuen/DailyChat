import { types } from "mobx-state-tree";

// Models
import AssignmentModel from "models/assignmentModel";

const ProjectModel = types
  .model("ProjectModel", {
    id: types.identifier,
    name: types.string,
    assignments: types.array(AssignmentModel),
  })
  .actions(self => ({
    addAssignment(assignment) {
      self.assignments = [...self.assignments, assignment];
    },
  }))
  .views(self => ({
    get sortedAssignments() {
      return self.assignments.slice().sort((a, b) => a.page - b.page);
    },
    get pageValues() {
      // Return an array of n...number
      return Array
        .from(Array(self.assignments.length)
        .keys())
        .map(number => ({
          value: number + 1,
          label: number + 1,
        }));
    },
  }));

export default ProjectModel;
