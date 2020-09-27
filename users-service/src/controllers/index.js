import buildRegisterUser from './register-user';
import buildLoginUser from './login-user';
import buildFind from './find';
import buildFindOne from './find-one';

import { addUser, getUser, getUsers } from '../use-cases';

import HashService from '../utils/HashService';
import TokenService from '../utils/TokenService';

const registerUser = buildRegisterUser({ addUser });
const loginUser = buildLoginUser({ getUser, HashService, TokenService });
const find = buildFind({ getUsers })
const findOne = buildFindOne({ getUser });

export {
  registerUser,
  loginUser,
  find,
  findOne
}
