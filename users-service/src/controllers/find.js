import { findOne } from "."

export default function buildFind({ getUsers }) {
  return async function find(httpRequest) {
    const { query } = httpRequest
    try {
      if (!query) throw new Error('Invalid query');
      const parsedQuery = JSON.parse(query)
      
      const users = await getUsers(parsedQuery);

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