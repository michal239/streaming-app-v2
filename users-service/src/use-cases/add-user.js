import { makeUser } from '../entities';
export default function buildAddUser({ usersDb }) {
  return async function addUser(userInfo) {

    const emailExists = await usersDb.findOne({ email: userInfo.email });
    const usernameExists = await usersDb.findOne({ username: userInfo.username });
    if (emailExists || usernameExists) throw new Error('Username or email is taken');
    
    const user = await makeUser(userInfo, true);
    

    return await usersDb.insert({
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword()
    })
  }
}