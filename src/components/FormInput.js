import React from "react";

const FormInput = (props) => {
  const { id, name, label, type, onChange, placeholder, value } = props;
  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        key={id}
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default FormInput;
