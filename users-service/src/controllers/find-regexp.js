export default function buildFindRegexp({ getUsers }) {
  return async function findRegexp(httpRequest) {
    const { key, value } = httpRequest;
    try {
      const regex = RegExp(value);
      const query = {
        [key]: {
          $regex: regex
        }
      }
      const users = await getUsers(query);
      return {
        statusCode: 200,
        body: {
          users
        }
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: {
          error: {
            message: err.message
          }
        }
      }
    }
  }
}