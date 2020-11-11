import React, { useState } from "react";

// Component
import CatalogEditor from "components/container/catalogEditor";
import CatalogSettings from "components/container/catalogSettings";

// UI
import Modal from "components/ui/modal";
import Button from "components/ui/button";

// Styling
import layout from "components/layout/instructorActionLayout.module.scss";
import button from "components/ui/button.module.scss";

const InstructorActionLayout = ({ catalogProps }) => {
  const [callback, setCallback] = useState(() => () => {});
  const { openCatalog, catalogIsOpen } = catalogProps;

  const onCloseModal = () => callback();

  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Instructor actions</span>
      </div>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="catalog editor" onClick={openCatalog} />
        <Modal
          content={<CatalogSettings modalCallback={setCallback} />}
          callback={onCloseModal}
        >
          <Button className={button.neutral} label="catalog settings" />
        </Modal>
      </div>
      {catalogIsOpen && <CatalogEditor />}
    </div>
  );
};

export default InstructorActionLayout;