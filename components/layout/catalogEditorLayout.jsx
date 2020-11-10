import React from "react";

// Component
import CatalogList from "components/container/catalogList";
import CatalogForm from "components/container/catalogForm";

// Styling
import layout from "components/layout/catalogEditorLayout.module.scss";

const CatalogEditor = ({ readError }) => {
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
            {readError ? readError : <CatalogList />}
          </div>
        </div>
        <CatalogForm />
      </div>
    </div>
  );
};

export default CatalogEditor;