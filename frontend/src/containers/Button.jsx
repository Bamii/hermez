import React from 'react';

const Button = ({ children, extras, btnClick }) => {
  return (
    <div
      onClick={btnClick}
      className={`${extras} flex items-center justify-center
      bg-primaryDark text-secondaryLighter rounded-lg`}
    >
      {children}
    </div>
  );
}

export default Button;
