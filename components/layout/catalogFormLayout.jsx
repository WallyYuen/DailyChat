import React from "react";
import clsx from "clsx";
import { observer, enableStaticRendering } from "mobx-react-lite";

// UI
import Button from "components/ui/button";
import TextField from "components/ui/textField";
import TextArea from "components/ui/textArea";
import Dropdown from "components/ui/dropdown";

// Styling
import layout from "components/layout/catalogFormLayout.module.scss";
import button from "components/ui/button.module.scss";

const CatalogFormLayout = ({
  onCancel,
  onSave,
  form,
  assignmentIsSelected,
  setProject,
  projectValues,
  writeError,
  pageValues,
  resetSelection,
  setPage,
}) => {
  enableStaticRendering(typeof window === "undefined");

  return (
    <div className={layout.container}>
      <div className={layout.form}>
        <div className={layout.projectField}>
          <Dropdown
            labelProps={{ label: "Project" }}
            inputProps={{ value: form.project?.id ?? 0 }}
            options={projectValues}
            onSelect={setProject}
          />
          <Dropdown
            labelProps={{ label: "Page" }}
            inputProps={{ value: form.page }}
            options={pageValues}
            onSelect={setPage}
          />
        </div>
        {!form.project && (
          <TextField
            inputProps={{
              value: form.newProjectName,
              onChange: form.setNewProjectName,
              placeholder: "New project name",
            }}
            className={layout.noTitleSpacing}
          />
        )}
        <TextField
          labelProps={{ label: "Title" }}
          inputProps={{
            value: form.assignmentName,
            onChange: form.setAssignmentName,
            placeholder: "Title for casus",
          }}
          className={layout.spacing}
        />
        <TextArea
          labelProps={{ label: "Content" }}
          inputProps={{ value: form.content, onChange: form.setContent }}
          className={clsx(layout.textArea, layout.spacing)}
        />
      </div>
      <div className={layout.buttonContainer}>
        {writeError && writeError}
        {assignmentIsSelected && (
          <Button label="new" className={clsx(button.neutral, layout.button)} onClick={resetSelection} />
        )}
        <Button
          label="cancel"
          className={clsx(button.neutral, layout.buttonMargin, layout.button)}
          onClick={onCancel}
        />
        <Button
          label="save"
          className={clsx(layout.button, {
            [button.disabled]: !form.canBeSaved,
            [button.primary]: form.canBeSaved,
          })}
          disabled={!form.canBeSaved}
          onClick={onSave}
        />
      </div>
    </div>
  );
};

export default observer(CatalogFormLayout);
