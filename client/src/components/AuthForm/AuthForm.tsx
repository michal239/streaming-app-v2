import React, { useReducer } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import AuthFormNavigation from '../AuthFormNavigation/AuthFormNavigation';
import './AuthForm.scss';

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'DISPLAY_LOGIN-FORM':
			return 'DISPLAY_LOGIN-FORM';
		case 'DISPLAY_REGISTER-FORM':
			return 'DISPLAY_REGISTER-FORM';
		default:
			return state;
	}
}

const AuthForm: React.FC<any> = props => {
	const [display, dispatch] = useReducer(reducer, 'DISPLAY_LOGIN-FORM');

	return (
		<div className="container">
			<div className="row" style={{ justifyContent: 'center' }}>
				<div className="col-2">
					<div className="auth-form">
						<i className="fas fa-times auth-form__close-icon" onClick={props.closeModal}></i>
						<AuthFormNavigation dispatch={dispatch} />
						{display === 'DISPLAY_LOGIN-FORM' ? <LoginForm /> : <RegisterForm />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
