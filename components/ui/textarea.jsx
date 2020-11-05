import React from "react";

import layout from "components/ui/textArea.module.scss";

const TextArea = ({ onChange, value, placeholder, name, label, type = "text", ...props }) => {
  const classes = [layout.container, props.className];

  return (
    <div className={classes.join(" ")}>
      <span className={layout.label}>{label}</span>
      <textarea
        className={layout.textArea}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;