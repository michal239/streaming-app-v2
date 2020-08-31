export default function buildUnsubscribeChannel({ removeSubscription }) {
  return async function unsubscribeChannel(httpRequest) {
    const { channelId, userId } = httpRequest;
    try {
      if (!channelId || !userId) throw new Error('no user or channel id');
      await removeSubscription({ channelId, userId });
      
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