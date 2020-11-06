import React from 'react';

interface FormFieldProps {
  className: string;
  type: string;
  name: string;
  value: string;
  handleChange: () => any;
}

const FormField: React.FC<FormFieldProps> = props => {
  const { className, type, name, value, handleChange } = props;
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
}

export default FormField;