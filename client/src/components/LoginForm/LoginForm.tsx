import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useForm } from '../../hooks/useForm';
import { loginUser } from '../../store/actions/currentUser';
import ClipLoader from 'react-spinners/ClipLoader';
import { LOGIN_USER } from '../../graphql';

const LoginForm: React.FC<any> = ({ loginUser, closeModal }) => {
  const [inputFields, setInputFields] = useForm({
    email: { value: '', touched: false },
    password: { value: '', touched: false },
  });
  const [fetchingError, setFetchingError] = useState('');
  const [loginMutation, { loading: mutationLoading, data: mutationData }] = useMutation(LOGIN_USER);

  useEffect(() => {
    setFetchingError('');
  }, [inputFields]);

  useEffect(() => {
    if (mutationData) {
      loginUser();
      closeModal();
    }
  }, [mutationData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = inputFields;
    try {
      await loginMutation({ variables: { email: email.value, password: password.value } });
    } catch (e) {
      setFetchingError(e.message);
    }
  };

  if (mutationLoading) {
    return (
      <div className="auth-form__loading-spinner">
        <ClipLoader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form__form">
      {fetchingError && <div className="auth-form__error-msg">{fetchingError}</div>}
      <div className="auth-form__field-wrapper">
        <div className="auth-form__label">
          <label htmlFor="">Email</label>
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
        <button className="auth-form__submit-btn">Login</button>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (token: string) => {
    dispatch(loginUser());
  },
});

export default connect(null, mapDispatchToProps)(LoginForm);
