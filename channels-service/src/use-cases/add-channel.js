export default function buildAddChannel({ makeChannel, channelsDb }) {
  return async function addChannel(userId) {

    const channel = makeChannel({ userId });
    
    return await channelsDb.insert({
      userId: channel.getUserId(),
      streamKey: channel.getStreamKey(),
      views: channel.getViews(),
      subscriptions: channel.getSubscriptions()
    })

  }
}