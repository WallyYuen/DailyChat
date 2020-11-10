import React from "react";
import clsx from "clsx";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/catalogViewerLayout.module.scss";
import button from "components/ui/button.module.scss";

const CatalogEditor = ({ readError, assignment, currentPage, totalPages, maxPage, handleNext, handlePrevious, closeCatalog }) => {
  return (
    <div className={layout.dimmer}>
      <div className={layout.container}>
        <div className={layout.frame}>
          {readError && readError}
          {!assignment && <div className={layout.noAssignment}>No catalog has been selected yet</div>}
          {!readError && assignment && (
            <div className={layout.content}>
              <span className={layout.pagination}>{`${currentPage} / ${totalPages}`}</span>
              <span className={layout.header}>{assignment.name}</span>
              <span className={layout.infoText}>{assignment.content}</span>
            </div>
          )}
        </div>
        <div className={layout.buttonContainer}>
          <Button
            label="close"
            className={clsx(layout.button, button.neutral)}
            onClick={closeCatalog}
          />
          <Button
            label="previous"
            className={clsx(layout.button, layout.buttonMargin, button.simple)}
            disabled={currentPage <= 1}
            onClick={handlePrevious}
          />
          <Button
            label="next"
            className={clsx(layout.button, button.neutral)}
            disabled={currentPage >= maxPage || currentPage >= totalPages}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogEditor;