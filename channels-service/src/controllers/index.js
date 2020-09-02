import buildCreateChannel from './create-channel';
import buildSubscribeChannel from './subscribe-channel';
import buildUnsubscribeChannel from './unsubscribe-channel';
import buildGetChannel from './get-channel';

import { addChannel, addSubscription, removeSubscription, getChannelUC } from '../use-cases';

const createChannel = buildCreateChannel({ addChannel });
const subscribeChannel = buildSubscribeChannel({ addSubscription });
const unsubscribeChannel = buildUnsubscribeChannel({ removeSubscription });
const getChannel = buildGetChannel({ getChannelUC });

export {
  createChannel,
  subscribeChannel,
  unsubscribeChannel,
  getChannel
}