import usersDb from '../database-layer'

import buildAddUser from './add-user';
import buildGetUser from './get-user';
import buildGetUsers from './get-users';

const addUser = buildAddUser({ usersDb });
const getUser = buildGetUser({ usersDb });
const getUsers = buildGetUsers({ usersDb });

export {
  addUser,
  getUser,
  getUsers
}