import React from 'react';

interface AuthFormNavigationProps {
  dispatch: any;
  display: 'DISPLAY_REGISTER-FORM' | 'DISPLAY_LOGIN-FORM';
}

const AuthFormNavigation: React.FC<AuthFormNavigationProps> = ({ dispatch, display }) => {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <button
        className={'auth-form__nav-btn ' + (display === 'DISPLAY_LOGIN-FORM' ? 'active' : '')}
        onClick={() => dispatch({ type: 'DISPLAY_LOGIN-FORM' })}
      >
        Login
      </button>
      <button
        className={'auth-form__nav-btn ' + (display === 'DISPLAY_REGISTER-FORM' ? 'active' : '')}
        onClick={() => dispatch({ type: 'DISPLAY_REGISTER-FORM' })}
      >
        Register
      </button>
    </div>
  );
};

export default AuthFormNavigation;
