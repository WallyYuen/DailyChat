import React from "react";
import clsx from "clsx";

// UI
import Dropdown from "components/ui/dropdown";
import Button from "components/ui/button";

// Styling
import layout from "components/layout/catalogSettingsLayout.module.scss";
import button from "components/ui/button.module.scss";

const CatalogSettingsLayout = ({
  projectValue,
  projectOptions,
  setProject,
  maxPageValue,
  onAccept,
  onCancel,
  setMaxPage,
  maxPageOptions,
}) => {
  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Catalog settings</span>
      </div>
      <div className={layout.body}>
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
        <div className={layout.actions}>
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
        </div>
      </div>
    </div>
  )
};

export default CatalogSettingsLayout;