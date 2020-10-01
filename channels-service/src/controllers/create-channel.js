export default function buildCreateChannel({ addChannel, getChannel }) {
  return async function createChannel(httpRequest) {
    const { userId } = httpRequest;
    try {
      if (!userId) throw new Error('no user id');
      
      const channel = await addChannel(userId);

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