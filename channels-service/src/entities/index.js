import buildMakeChannel from './channel';

import { nanoid } from 'nanoid';

function generateID(length) {
  return nanoid().substring(0, length)
}

const makeChannel = buildMakeChannel({ generateID });

export default makeChannel