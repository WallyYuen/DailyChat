import React from "react";
import clsx from "clsx";

// Component
import CatalogList from "components/container/catalogList";

// UI
import Button from "components/ui/button";
import TextField from "components/ui/text";
import TextArea from "components/ui/textArea";

// Styling
import layout from "components/layout/catalogManagerLayout.module.scss";
import button from "components/ui/button.module.scss";

const CatalogManager = () => {
  return (
    <div className={layout.dimmer}>
      <div className={layout.container}>
        <div className={layout.infoContainer}>
          <div className={layout.info}>
            <span className={layout.header}>Catalogus management</span>
            <span className={layout.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et cursus enim. Nam faucibus varius eros vitae rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </span>
          </div>
          <div className={layout.catalog}>
            <CatalogList />
          </div>
        </div>
        <div className={layout.formContainer}>
          <div className={layout.form}>
            <div className={layout.projectField}>
              <TextField label="Project" placeholder="New project" />
              <TextField label="Page" placeholder="1" />
            </div>
            <TextField placeholder="New project name" className={layout.noTitleSpacing} />
            <TextField label="Title" placeholder="Title for casus" className={layout.spacing} />
            <TextArea label="Content" className={clsx(layout.textArea, layout.spacing)} />
          </div>

          <div className={layout.buttonContainer}>
            <Button label="delete" className={clsx(button.alert, layout.button)} />
            <Button label="cancel" className={clsx(button.neutral, layout.buttonMargin, layout.button)} />
            <Button label="save" className={clsx(button.primary, layout.button)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogManager;