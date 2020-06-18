export default function buildMakeChannel({ generateID }) {
  return function makeChannel({
    userId,
    streamKey,
    views,
    subscriptions
  }) {
    if (!userId) throw new Error('errorhere');
    if (typeof views === "undefined" || typeof subscriptions === "undefined") throw new Error('error2');

    if (!streamKey) streamKey = generateID(12);

    
    return Object.freeze({
      getUserId: () => userId,
      getStreamKey: () => streamKey,
      getViews: () => views,
      getSubscriptions: () => subscriptions
    })
  }
}