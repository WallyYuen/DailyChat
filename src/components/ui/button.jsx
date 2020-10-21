import React from "react";

const Button = ({ onClick, label, ...props }) => {
  const classes = props.classes || [];
  const defaultClasses = ["btn", "px-5", ...classes];

  return (
    <button className={defaultClasses.join(" ")} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default Button;