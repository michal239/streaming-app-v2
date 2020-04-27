import { makeUser } from '../entities';
export default function buildAddUser({ usersDb }) {
  return async function addUser(userInfo) {
    const user = await makeUser(userInfo, true);

    const emailExists = await usersDb.findOne({ email: user.getEmail() });
    const usernameExists = await usersDb.findOne({ username: user.getUsername() });

    if (emailExists || usernameExists) throw new Error('Username or email is taken');

    return usersDb.insert({
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword()
    })
  }
}