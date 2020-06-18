import buildAddChannel from './add-channel';


// dependencies
import makeChannel from '../entities';
import channelsDb from '../database-layer/channels-db';

const addChannel = buildAddChannel({ makeChannel, channelsDb });

export default addChannel;