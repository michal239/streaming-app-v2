import buildRegisterUser from './register-user';

import { addUser } from '../use-cases';

const registerUser = buildRegisterUser({ addUser });

export {
  registerUser
}
