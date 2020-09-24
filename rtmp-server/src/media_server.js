import NodeMediaServer from 'node-media-server';
import { rtmp_server as config } from './config';

import ChannelsClient from './services/ChannelsService/ChannelsClient';
import StreamsClient from './services/StreamsService/StreamsClient';

const nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKey(StreamPath);
  ChannelsClient.getChannel({ streamKey }, function(err, res) {
    if (err || res.status.failed) {
      const session = nms.getSession(id);
      session.reject();
    } else {
      StreamsClient.addStream({ streamKey }, function(err,res){});
    }
  });
});

nms.on('donePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKey(StreamPath);
  StreamsClient.removeStream({ streamKey }, function(err,res){})
});

function getStreamKey(path) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default nms;