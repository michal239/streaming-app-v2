import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { gql, useLazyQuery } from '@apollo/client';
import AvailabilityMarker from './AvailabilityMarker';
import { connect } from 'react-redux';
import validate from '../../utils/registerValidation';

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
  //@ts-ignore
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [checkUser, { loading: userLoading, data: usernameData }] = useLazyQuery(GET_USER);
  const [checkEmail, { loading: emailLoading, data: emailData }] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (!inputFields.username.touched) return;
    try {
      validate.username(inputFields.username.value);
      setFieldErrors({ ...fieldErrors, username: '' });
    } catch (error) {
      setFieldErrors({ ...fieldErrors, username: error.message });
    }
    const timer = setTimeout(() => {
      checkUser({ variables: { key: 'username', value: inputFields.username.value } });
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputFields.username.value]);

  useEffect(() => {
    if (!inputFields.email.touched || !fieldErrors.email) return;
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
    <form className="auth-form__form">
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Username</label>
          {inputFields.username.touched && (
            <AvailabilityMarker
              loading={userLoading}
              success={usernameData ? !usernameData.user : false}
            />
          )}
        </div>
        <input
          className="auth-form__field"
          type="text"
          name="username"
          value={inputFields.username.value}
          onChange={setInputFields}
        />
        <div>{fieldErrors.username}</div>
      </div>
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Email</label>
          {inputFields.email.touched && (
            <AvailabilityMarker
              loading={emailLoading}
              success={emailData ? !emailData.user : false}
            />
          )}
        </div>
        <input
          className="auth-form__field"
          type="text"
          name="email"
          value={inputFields.email.value}
          onChange={setInputFields}
        />
      </div>
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Password</label>
        </div>
        <input
          className="auth-form__field"
          type="password"
          name="password"
          value={inputFields.password.value}
          onChange={setInputFields}
        />
      </div>
      <div className="auth-form__field-wrapper">
        <button className="auth-form__submit-btn">Register</button>
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
