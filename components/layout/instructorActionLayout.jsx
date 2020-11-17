import React, { useState } from "react";

// Component
import CatalogEditor from "components/container/catalogEditor";
import Modal from "components/container/modal";
import CatalogSettingsModal from "components/container/catalogSettingsModal";

// UI
import Button from "components/ui/button";

// Styling
import layout from "components/layout/instructorActionLayout.module.scss";
import button from "components/ui/button.module.scss";

const InstructorActionLayout = ({ catalogProps, callProps }) => {
  const onCloseModal = () => callback();
  const [callback, setCallback] = useState(() => () => {});

  const { startCall } = callProps;
  const { openCatalog, catalogIsOpen } = catalogProps;


  return (
    <div className={layout.container}>
      <div className={layout.header}>
        <span>Instructor actions</span>
      </div>
      <div className={layout.buttonContainer}>
        <Button className={button.neutral} label="catalog editor" onClick={openCatalog} />
        <div>
          <Modal
            content={<CatalogSettingsModal modalCallback={setCallback} />}
            callback={onCloseModal}
          >
            <Button className={button.neutral} label="catalog settings" />
          </Modal>
        </div>
        <Button className={button.neutral} label="start call" onClick={startCall} />
      </div>
      {catalogIsOpen && <CatalogEditor />}
    </div>
  );
};

export default InstructorActionLayout;