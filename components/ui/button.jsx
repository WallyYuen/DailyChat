import React, { forwardRef } from "react";

const Button = forwardRef(({ onClick, label, ...props }, ref) => {
  const classes = props.classes || [];
  const defaultClasses = ["btn", "px-5", ...classes];

  return (
    <button className={defaultClasses.join(" ")} onClick={onClick} {...props} ref={ref}>
      {label}
    </button>
  );
});

export default Button;