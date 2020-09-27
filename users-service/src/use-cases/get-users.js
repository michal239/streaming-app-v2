export default function buildGetUsers({ usersDb }) {
  return async function getUsers(query) {
    return await usersDb.find(query);
  }
}