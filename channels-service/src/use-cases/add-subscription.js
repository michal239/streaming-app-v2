export default function buildAddSubscription({ channelsDb }) {
  return async function addSubscription({ userId, channelId }) {
    const channel = await channelsDb.findById(channelId);
    
    if (!channel) throw new Error('No such channel');
    if (channel.subscriptions.subscribers.includes(userId)) throw new Error('You are already subbed');
    
    channel.subscriptions.subscribers.push(userId);
    channel.subscriptions.count++;
    
    await channelsDb.save(channel);
    
    return channel;
  }
}