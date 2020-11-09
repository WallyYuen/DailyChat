import React, { forwardRef } from "react";

// Styling
import layout from "components/ui/button.module.scss";

const Button = forwardRef(({ onClick, label, size = "medium", ...props }, ref) => {
  const classes = [layout[size], props.className];

  return (
    <button {...props} className={classes.join(" ")} onClick={onClick} ref={ref}>
      {label}
    </button>
  );
});

export default Button;