import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalPortal from '../ModalPortal/ModalPortal';
import AuthForm from '../AuthForm/AuthForm';

const AuthButtons: React.FC = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [displayMode, setDisplayMode] = useState<'DISPLAY_LOGIN-FORM' | 'DISPLAY_REGISTER-FORM'>('DISPLAY_LOGIN-FORM')
  return (
    <div>
      {showAuthForm && (
        <ModalPortal>
          <Modal>
            <AuthForm closeModal={() => setShowAuthForm(false)} displayMode={displayMode} />
          </Modal>
        </ModalPortal>
      )}
      <button
        onClick={() => {
          setDisplayMode('DISPLAY_LOGIN-FORM');
          setShowAuthForm(currentState => !currentState);
        }}
        style={{ marginLeft: '5px' }}
        className="navbar__button"
      >
        Login
      </button>
      <button className="navbar__button navbar__button--bold"
        onClick={() => {
          setDisplayMode('DISPLAY_REGISTER-FORM');
          setShowAuthForm(currentState => !currentState);
        }}
      >
        Register
      </button>
    </div>
  );
};

export default AuthButtons;
