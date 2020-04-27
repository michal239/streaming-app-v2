export default function buildGetUser({ usersDb }) {
  return async function getUser({
    id,
    username,
    email
  }) {
    if (id) {
      return await usersDb.findById(id);
    } else if (email) {
      return await usersDb.findOne({ email });
    } else return await usersDb.findOne({ username });

  }
}