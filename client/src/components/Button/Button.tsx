import React from 'react';

interface ButtonProps {
  className: string;
  disabled?: boolean;
  handleClick?: () => any;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, children } = props;

  return (
    <button
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;