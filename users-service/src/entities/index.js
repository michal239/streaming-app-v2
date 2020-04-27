import bcrypt from 'bcryptjs';
import buildMakeUser from './user';

async function makeHash(data) {
  return await bcrypt.hash(data, 10)
}

const makeUser = buildMakeUser({ makeHash })

export {
  makeUser
}
export default makeUser;