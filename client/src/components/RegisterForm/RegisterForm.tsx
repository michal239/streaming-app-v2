import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { gql, useLazyQuery } from '@apollo/client';
import AvailabilityMarker from './AvailabilityMarker';
import Field from '../FormField/FormField';
import Button from '../Button/Button';
import { connect } from 'react-redux';

import './RegisterForm.scss';
const GET_USER = gql`
	query user($key: String!, $value: String!) {
		user(key: $key, value: $value) {
			id
			username
		}
	}
`;
const RegisterForm: React.FC = () => {
	const [inputFields, setInputFields] = useForm({
		username: { value: '', touched: false },
		email: { value: '', touched: false },
		password: { value: '', touched: false },
	});
	const [checkUser, { loading: userLoading, data: usernameData }] = useLazyQuery(GET_USER);
	const [checkEmail, { loading: emailLoading, data: emailData }] = useLazyQuery(GET_USER);

	useEffect(() => {
		if (!inputFields.username.touched) return;
		const timer = setTimeout(() => {
			checkUser({ variables: { key: 'username', value: inputFields.username.value } });
		}, 1000);

		return () => clearTimeout(timer);
	}, [inputFields.username.value]);

	useEffect(() => {
		if (!inputFields.email.touched) return;
		const timer = setTimeout(() => {
			checkEmail({ variables: { key: 'email', value: inputFields.email.value } });
		}, 1000);

		return () => clearTimeout(timer);
	}, [inputFields.email.value]);

	useEffect(() => {
		if (userLoading) return;
		if (usernameData === undefined) return;
		const msg = usernameData.user ? 'username zajęty' : 'usernamy wolny';
		console.log(msg);
	}, [usernameData]);

	useEffect(() => {
		if (emailLoading) return;
		if (emailData === undefined) return;
		const msg = emailData.user ? 'email zajęty' : 'email wolny';
		console.log(msg);
	}, [emailData]);

	// function handleChange(e: any) {
	// checkUser({ variables: { key: 'username', value: e.target.value } })
	// console.log(data)
	// }

	return (
		<form className="register-form">
			<div className="register-form__wrapper">
				<div className="register-form__label">
					<label htmlFor="">Username</label>
					{inputFields.username.touched && (
						<AvailabilityMarker
							loading={userLoading}
							success={usernameData ? !usernameData.user : false}
						/>
					)}
				</div>
				<Field
					className="register-form__field"
					type="text"
					name="username"
					value={inputFields.username.value}
					handleChange={setInputFields}
				/>
			</div>
			<div className="register-form__wrapper">
				<div className="register-form__label">
					<label htmlFor="">Email</label>
					{inputFields.email.touched && (
						<AvailabilityMarker
							loading={emailLoading}
							success={emailData ? !emailData.user : false}
						/>
					)}
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
					{/* {inputFields.email.touched &&
            <AvailabilityMarker
            loading={emailLoading}
            success={emailData ? !emailData.user : false}
          />} */}
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
				<Button className="auth-form__submit-btn" handleClick={() => {}}>
					Register
				</Button>
			</div>
		</form>
	);
};

const mapDispatchToProps = () => {
	return {
		handleLogin(user: any) {
			return {
				action: 'LOG_IN',
				user,
			};
		},
	};
};

export default connect(null, mapDispatchToProps)(RegisterForm);
