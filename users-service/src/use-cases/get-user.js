export default function buildGetUser({ usersDb }) {
  return async function getUser(query) {
    return await usersDb.findOne(query);
  }
}