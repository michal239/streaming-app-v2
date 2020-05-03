import buildRegisterUser from './register-user';
import buildLoginUser from './login-user';

import { addUser, getUser } from '../use-cases';

import HashService from '../utils/HashService';
import TokenService from '../utils/TokenService';

const registerUser = buildRegisterUser({ addUser });
const loginUser = buildLoginUser({ getUser, HashService, TokenService });

export {
  registerUser,
  loginUser
}
