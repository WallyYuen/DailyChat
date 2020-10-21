import React from "react";

const Textfield = ({ onChange, value, placeholder, name, type }) => {
  return (
    <input
      className="form-control"
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
};

export default Textfield;