import React from "react";

import layout from "components/ui/textField.module.scss";

const TextField = ({ onChange, value, placeholder, name, label, type = "text", ...props }) => {
  const classes = [layout.container, props.className];

  return (
    <div className={classes.join(" ")}>
      <span className={layout.label}>{label}</span>
      <input
        className={layout.textField}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;