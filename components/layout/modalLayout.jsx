import React from "react";
import Tippy, { tippy } from "@tippyjs/react";
import { followCursor } from "tippy.js";

// Styling
import "tippy.js/dist/tippy.css";
import layout from "components/layout/modalLayout.module.scss";

const ModalLayout = ({
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

export default ModalLayout;