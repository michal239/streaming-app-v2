export default function buildFindOne({ getUser }) {
  return async function findOne(httpRequest) {
    const { query } = httpRequest
    try {
      if (!query) throw new Error('Invalid query');
      const parsedQuery = JSON.parse(query)
      
      const user = await getUser(parsedQuery);

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