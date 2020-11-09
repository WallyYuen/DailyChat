import React from "react";
import clsx from "clsx";

// Icon
import DropdownIcon from "components/icon/dropdownIcon";

// Styling
import layout from "components/ui/dropdown.module.scss";

const Dropdown = ({ options = [], onSelect, labelProps, inputProps, ...props }) => {
  const label = labelProps?.label;
  const value = inputProps?.value;

  return (
    <div className={clsx(layout.container, props?.className)}>
      {label && (
        <span {...labelProps} className={clsx(layout.label, labelProps?.className)}>{label}</span>
      )}
      <div className={layout.frame}>
        <select className={clsx(layout.dropdown, inputProps?.className)} value={value} onChange={onSelect}>
          {options.map(({ value, label }) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ))}
        </select>
        <DropdownIcon className={layout.icon} />
      </div>
    </div>
  );
};

export default Dropdown;
