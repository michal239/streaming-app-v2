import usersDb from '../database-layer'

import buildAddUser from './add-user';
import buildGetUser from './get-user';

const addUser = buildAddUser({ usersDb });
const getUser = buildGetUser({ usersDb });

export {
  addUser,
  getUser
}