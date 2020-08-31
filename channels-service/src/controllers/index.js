import buildCreateChannel from './create-channel';
import buildSubscribeChannel from './subscribe-channel';
import buildUnsubscribeChannel from './unsubscribe-channel';

import { addChannel, addSubscription, removeSubscription } from '../use-cases';

const createChannel = buildCreateChannel({ addChannel });
const subscribeChannel = buildSubscribeChannel({ addSubscription });
const unsubscribeChannel = buildUnsubscribeChannel({ removeSubscription });

export {
  createChannel,
  subscribeChannel,
  unsubscribeChannel
}