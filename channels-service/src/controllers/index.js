import buildCreateChannel from './create-channel';
import buildSubscribeChannel from './subscribe-channel';

import { addChannel, addSubscription } from '../use-cases';

const createChannel = buildCreateChannel({ addChannel });
const subscribeChannel = buildSubscribeChannel({ addSubscription });

export {
  createChannel,
  subscribeChannel
}