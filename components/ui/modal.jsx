import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";

// Styling
import "tippy.js/dist/tippy.css";
import layout from "components/ui/modal.module.scss";

const Modal = ({ content, children, placement = "left-start", disabled = false }) => {
  return (
    <Tippy
      content={content}
      className={layout.tippy}
      trigger="click"
      touch
      interactive
      arrow={false}
      placement={placement}
      disabled={disabled}
      plugins={[followCursor]}
      followCursor="initial"
    >
      {children}
    </Tippy>
  );
};

export default Modal;