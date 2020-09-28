export default function buildRegisterUser({ addUser }) {
  return async function registerUser(httpRequest) {
    try {
      const user = await addUser(httpRequest);
      return {
        statusCode: 200,
        body: {
          user
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