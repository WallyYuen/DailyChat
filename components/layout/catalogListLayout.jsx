import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// Icon
import DustbinIcon from "components/icon/dustbinIcon";

// Styling
import layout from "components/layout/catalogListLayout.module.scss";

const CatalogListLayout = ({ handleDeleteVisibility, projects, selectedAssignmentId, handleSelectAssignment, handleRemoveAssignment }) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={layout.container}>
      {projects.map((project) => (
        <div key={project.id}>
          <div className={layout.project}>
            {project.name}
          </div>
          <ul className={layout.list}>
            {project.sortedAssignments.map((assignment, index) => {
              const isSelected = assignment.id === selectedAssignmentId;
              const assignmentClass = clsx(layout.assignment, { [layout.selected]: isSelected });

              return (
                <li key={assignment.id} className={assignmentClass} onClick={handleSelectAssignment(assignment)} onMouseEnter={handleDeleteVisibility(assignment)} onMouseLeave={handleDeleteVisibility(assignment)}>
                  <span className={layout.bullet}>{`${index + 1}.`}</span>
                  <span>{assignment.name}</span>
                  <DustbinIcon className={clsx(layout.dustbin, { [layout.active]: assignment.isHovered || isSelected })} onClick={handleRemoveAssignment(assignment)}/>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default observer(CatalogListLayout);