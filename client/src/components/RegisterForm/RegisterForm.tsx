import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import validate from '../../utils/registerValidation';
import ClipLoader from 'react-spinners/ClipLoader';

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`;

const RegisterForm: React.FC<any> = ({ closeModal }) => {
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
  const [fetchingError, setFetchingError] = useState('');
  const [registerMutation, { loading }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      validate.username(inputFields.username.value);
      setFieldErrors(state => ({ ...state, username: '' }));
    } catch (error) {
      setFieldErrors(state => ({ ...state, username: error.message }));
    }
    try {
      validate.email(inputFields.email.value);
      setFieldErrors(state => ({ ...state, email: '' }));
    } catch (error) {
      setFieldErrors(state => ({ ...state, email: error.message }));
    }
    try {
      validate.password(inputFields.password.value);
      setFieldErrors(state => ({ ...state, password: '' }));
    } catch (error) {
      setFieldErrors(state => ({ ...state, password: error.message }));
    }

    try {
      validate.username(inputFields.username.value);
      validate.email(inputFields.email.value);
      validate.password(inputFields.password.value);
      await register();
    } catch (error) {}
  };

  const register = async () => {
    try {
      await registerMutation({
        variables: {
          username: inputFields.username.value,
          email: inputFields.email.value,
          password: inputFields.password.value,
        },
      });
      closeModal();
    } catch (error) {
      setFetchingError(error.message);
    }
  };

  useEffect(() => {
    setFieldErrors(state => ({ ...state, username: '' }));
  }, [inputFields.username.value]);

  useEffect(() => {
    setFieldErrors(state => ({ ...state, email: '' }));
  }, [inputFields.email.value]);

  useEffect(() => {
    setFieldErrors(state => ({ ...state, password: '' }));
  }, [inputFields.password.value]);

  if (loading) {
    return (
      <div className="auth-form__loading-spinner">
        <ClipLoader />
      </div>
    );
  }

  return (
    <form className="auth-form__form" onSubmit={handleSubmit}>
      {fetchingError && <div className="auth-form__error-msg">{fetchingError}</div>}
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Username</label>
        </div>
        <input
          className={'auth-form__field' + (fieldErrors.username && ' auth-form__field--error')}
          type="text"
          name="username"
          value={inputFields.username.value}
          onChange={setInputFields}
        />
        <div className="auth-form__field-error">{fieldErrors.username}</div>
      </div>
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Email</label>
        </div>
        <input
          className={'auth-form__field' + (fieldErrors.email && ' auth-form__field--error')}
          type="text"
          name="email"
          value={inputFields.email.value}
          onChange={setInputFields}
        />
        <div className="auth-form__field-error">{fieldErrors.email}</div>
      </div>
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Password</label>
        </div>
        <input
          className={'auth-form__field' + (fieldErrors.password && ' auth-form__field--error')}
          type="password"
          name="password"
          value={inputFields.password.value}
          onChange={setInputFields}
        />
        <div className="auth-form__field-error">{fieldErrors.password}</div>
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
