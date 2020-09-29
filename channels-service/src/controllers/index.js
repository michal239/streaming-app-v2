import buildCreateChannel from './create-channel';
import buildSubscribeChannel from './subscribe-channel';
import buildUnsubscribeChannel from './unsubscribe-channel';
import buildFindOne from './find-one';

import { addChannel, addSubscription, removeSubscription, getChannel } from '../use-cases';

const createChannel = buildCreateChannel({ addChannel });
const subscribeChannel = buildSubscribeChannel({ addSubscription });
const unsubscribeChannel = buildUnsubscribeChannel({ removeSubscription });
const findOne = buildFindOne({ getChannel })


export {
  createChannel,
  subscribeChannel,
  unsubscribeChannel,
  findOne
}