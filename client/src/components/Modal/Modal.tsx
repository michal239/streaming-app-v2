import React from 'react';
import './Modal.scss';

const Modal: React.FC = (props: any) => {
  return <div className="modal">{props.children}</div>;
};

export default Modal;
