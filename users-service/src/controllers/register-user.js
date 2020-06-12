export default function buildRegisterUser({ addUser }) {
  return async function registerUser(httpRequest) {
    try {
      await addUser(httpRequest);
      return {
        statusCode: 200
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