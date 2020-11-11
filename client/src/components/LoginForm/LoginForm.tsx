import React from 'react';
import Field from '../FormField/FormField';
import { useForm } from '../../hooks/useForm';
import Button from '../Button/Button';

import '../RegisterForm/RegisterForm.scss';

const LoginForm: React.FC = () => {
	const [inputFields, setInputFields] = useForm({
		email: { value: '', touched: false },
		password: { value: '', touched: false },
	});
	return (
		<form className="register-form">
			<div className="register-form__wrapper">
				<div className="register-form__label">
					<label htmlFor="">Email</label>
				</div>
				<Field
					className="register-form__field"
					type="text"
					name="email"
					value={inputFields.email.value}
					handleChange={setInputFields}
				/>
			</div>
			<div className="register-form__wrapper">
				<div className="register-form__label">
					<label htmlFor="">Password</label>
				</div>
				<Field
					className="register-form__field"
					type="password"
					name="password"
					value={inputFields.password.value}
					handleChange={setInputFields}
				/>
			</div>
			<div className="register-form__wrapper">
				<Button className="auth-form__submit-btn">Login</Button>
			</div>
		</form>
	);
};

export default LoginForm;
