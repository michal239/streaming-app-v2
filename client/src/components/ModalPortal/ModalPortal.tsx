import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal: React.FC = (props: any) => {
	const modalRoot = document.querySelector('#modal');
	const element = document.createElement('div');

	useEffect(() => {
		modalRoot?.appendChild(element);

		return () => {
			modalRoot?.removeChild(element);
		};
	}, []);

	return createPortal(props.children, element);
};

export default ModalPortal;
