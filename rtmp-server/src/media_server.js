import NodeMediaServer from 'node-media-server';
import { rtmp_server as config } from './config';

import ChannelsClient from './services/ChannelsService/ChannelsClient';

const nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKey(StreamPath);
  ChannelsClient.getChannel({ streamKey }, function(err, res) {
    if (err || res.status.failed) {
      const session = nms.getSession(id);
      session.reject();
    }
  });
});


function getStreamKey(path) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default nms;