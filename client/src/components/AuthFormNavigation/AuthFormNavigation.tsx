import React from 'react';

const AuthFormNavigation: React.FC<any> = ({ dispatch }) => {
  return (
    <div style={{ display: 'flex' }}>
      <button onClick={() => dispatch({ type: 'DISPLAY_LOGIN-FORM' })}>LOGIN</button>
      <button onClick={() => dispatch({ type: 'DISPLAY_REGISTER-FORM' })}>REGISTER</button>
    </div>
  );
};

export default AuthFormNavigation;
