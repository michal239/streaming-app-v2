import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalPortal from '../ModalPortal/ModalPortal';
import AuthForm from '../AuthForm/AuthForm';

const AuthButtons: React.FC = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div>
      {showAuthForm && (
        <ModalPortal>
          <Modal>
            <AuthForm closeModal={() => setShowAuthForm(false)} />
          </Modal>
        </ModalPortal>
      )}
      <button
        onClick={() => {
          setShowAuthForm(currentState => !currentState);
        }}
        style={{ marginLeft: '5px' }}
        className="navbar__button"
      >
        Login
      </button>
      <button className="navbar__button navbar__button--bold">Register</button>
    </div>
  );
};

export default AuthButtons;
