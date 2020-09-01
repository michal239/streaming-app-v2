export default function buildRemoveSubscription({ channelsDb }) {
  return async function removeSubscription({ userId, channelId }) {
    const channel = await channelsDb.findById(channelId);
    
    if (!channel) throw new Error('No such channel');
    if (!channel.subscriptions.subscribers.includes(userId)) throw new Error('This user is not subbed');

    channel.subscriptions.subscribers.splice(channel.subscriptions.subscribers.indexOf(userId), 1);
    channel.subscriptions.count--;

    await channelsDb.save(channel);

    return channel;
  }
} 