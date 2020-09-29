import buildAddChannel from './add-channel';
import buildGetChannel from './get-channel';
import buildAddSubscription from './add-subscription';
import buildRemoveSubscription from './remove-subscription';

// dependencies
import makeChannel from '../entities';
import channelsDb from '../database-layer/channels-db';

const addChannel = buildAddChannel({ makeChannel, channelsDb });
const getChannel = buildGetChannel({ channelsDb });
const addSubscription = buildAddSubscription({ channelsDb });
const removeSubscription = buildRemoveSubscription({ channelsDb });

export {
  addChannel,
  getChannel,
  addSubscription,
  removeSubscription
};