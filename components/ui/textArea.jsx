import React from "react";
import clsx from "clsx";

// Styling
import layout from "components/ui/textArea.module.scss";

const TextArea = ({ labelProps, inputProps, ...props }) => {
  const label = labelProps?.label;
  const type = inputProps?.type ?? "text";

  return (
    <div className={clsx(layout.container, props?.className)}>
      {label && (
        <span {...labelProps} className={clsx(layout.label, labelProps?.className)}>{label}</span>
      )}
      <textarea
        {...inputProps}
        type={type}
        className={clsx(layout.textArea, inputProps?.className)}
      />
    </div>
  );
};

export default TextArea;