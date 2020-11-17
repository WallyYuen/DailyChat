import React, { useMemo } from "react";
import clsx from "clsx";

// Layout
import ModalContentLayout from "components/layout/modalContentLayout";

// UI
import Dropdown from "components/ui/dropdown";
import Button from "components/ui/button";

// Styling
import layout from "components/layout/catalogSettingsModalLayout.module.scss";
import button from "components/ui/button.module.scss";

const CatalogSettingsModalLayout = ({
  projectValue,
  projectOptions,
  setProject,
  maxPageValue,
  onAccept,
  onCancel,
  setMaxPage,
  maxPageOptions,
}) => {
  const header = "Catalog settings";
  const classes = { container: layout.container };

  const content = useMemo(() => (
    <div className={layout.content}>
      <Dropdown
        labelProps={{ label: "Project" }}
        inputProps={{ value: projectValue}}
        options={projectOptions}
        onSelect={setProject}
      />
      <Dropdown
        labelProps={{ label: "Progress (max page)" }}
        inputProps={{ value: maxPageValue }}
        options={maxPageOptions}
        onSelect={setMaxPage}
      />
    </div>
  ), [projectValue, projectOptions, setProject, maxPageValue, maxPageOptions, setMaxPage])

  const actions = useMemo(() => (
    <React.Fragment>
      <Button
        className={clsx(layout.button, button.transparent)}
        label="cancel"
        size="small"
        onClick={onCancel}
      />
      <Button
        className={clsx(layout.button, button.primary)}
        label="confirm"
        size="small"
        onClick={onAccept}
      />
    </React.Fragment>
  ), [onCancel, onAccept])
  
  return <ModalContentLayout header={header} content={content} actions={actions} classes={classes} />;
};

export default CatalogSettingsModalLayout;