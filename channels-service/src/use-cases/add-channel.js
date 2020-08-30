export default function buildAddChannel({ makeChannel, channelsDb }) {
  return async function addChannel(userId) {
    const userHasChannel = await channelsDb.findOne({ userId });
    if (userHasChannel) throw new Error('jdjd')

    const INITIAL_STATE = {
      views: 0,
      subscriptions: {
        count: 0,
        subscribers: []
      }
    }

    const channel = makeChannel({ userId, ...INITIAL_STATE });
    
    return await channelsDb.insert({
      userId: channel.getUserId(),
      streamKey: channel.getStreamKey(),
      views: channel.getViews(),
      subscriptions: channel.getSubscriptions()
    });

  }
}