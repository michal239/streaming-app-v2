import buildAddChannel from './add-channel';
import buildGetChannel from './get-channel';
import buildAddSubscription from './add-subscription';

// dependencies
import makeChannel from '../entities';
import channelsDb from '../database-layer/channels-db';

const addChannel = buildAddChannel({ makeChannel, channelsDb });
const getChannel = buildGetChannel({ channelsDb });
const addSubscription = buildAddSubscription({ channelsDb });

export {
  addChannel,
  getChannel,
  addSubscription
};