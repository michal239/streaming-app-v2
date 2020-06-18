export default function buildMakeChannel({ generateID }) {
  return function makeChannel({
    userId
  }) {
    if (!userId) throw new Error('errorhere');

    const streamKey = generateID(12);
    const views = 0;
    const subscriptions = {
      count: 0,
      subscribers: []
    }
    
    return Object.freeze({
      getUserId: () => userId,
      getStreamKey: () => streamKey,
      getViews: () => views,
      getSubscriptions: () => subscriptions
    })
  }
}