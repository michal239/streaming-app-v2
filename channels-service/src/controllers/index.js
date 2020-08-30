import buildCreateChannel from './create-channel';

import { addChannel } from '../use-cases';

const createChannel = buildCreateChannel({ addChannel });

export {
  createChannel
}