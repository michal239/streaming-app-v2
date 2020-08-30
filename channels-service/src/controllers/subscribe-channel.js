export default function buildSubscribeChannel({ addSubscription }) {
  return async function subscribeChannel(httpRequest) {
    const { channelId, userId } = httpRequest;
    try {
      if (!channelId || !userId) throw new Error('no user or channel id');
      await addSubscription({ channelId, userId });
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