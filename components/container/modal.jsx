import React, { useEffect } from "react";
import { hideAll } from "tippy.js";

// Layout
import ModalLayout from "components/layout/modalLayout";

const Modal = ({
  children,
  content,
  placement = "left-start",
  disabled = false,
  callback = () => {},
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") hideAll();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ModalLayout
      children={children}
      content={content}
      placement={placement}
      disabled={disabled}
      callback={callback}
    />
  );
};

export default Modal;