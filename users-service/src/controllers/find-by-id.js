export default function buildFindById({ getUser }) {
  return async function findById(httpRequest) {
    const { id } = httpRequest;
    try {
      if (!id) throw new Error('Invalid id');

      const user = await getUser({ _id: id });
      
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