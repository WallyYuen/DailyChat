import React from "react";
import clsx from "clsx";

import layout from "components/ui/textField.module.scss";

const TextField = ({ labelProps, inputProps, ...props }) => {
  const label = labelProps?.label;
  const type = inputProps?.type ?? "text";

  return (
    <div className={clsx(layout.container, props?.className)}>
      {label && (
        <span {...labelProps} className={clsx(layout.label, labelProps?.className)}>{label}</span>
      )}
      <input
        {...inputProps}
        type={type}
        className={clsx(layout.textField, inputProps?.className)}
      />
    </div>
  );
};

export default TextField;