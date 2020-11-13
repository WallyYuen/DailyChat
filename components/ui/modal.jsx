import React from "react";
import Tippy, { tippy } from "@tippyjs/react";
import { followCursor } from "tippy.js";

// Styling
import "tippy.js/dist/tippy.css";
import layout from "components/ui/modal.module.scss";

// TODO: Change name to Popup or something
const Modal = ({
  children,
  content,
  placement = "left-start",
  disabled = false,
  callback = () => {},
}) => {
  tippy.setDefaultProps({ maxWidth: "" });

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
      onHidden={callback}
    >
      {children}
    </Tippy>
  );
};

export default Modal;