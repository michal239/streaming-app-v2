export default function buildFindOne({ getChannel }) {
  return async function findOne(httpRequest) {
    const { query } = httpRequest
    try {
      if (!query) throw new Error('Invalid query');
      const parsedQuery = JSON.parse(query)
      
      const channel = await getChannel(parsedQuery);

      return {
        statusCode: 200,
        body: {
          channel
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