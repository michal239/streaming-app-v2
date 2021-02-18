import NodeMediaServer from 'node-media-server';
import grpc from 'grpc';
import { rtmp_server as config } from './config';
import ChannelsClient from './services/ChannelsService/ChannelsClient';
import StreamsClient from './services/StreamsService/StreamsClient';

const nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKey(StreamPath);
  const query = JSON.stringify({ streamKey });

  const meta = generateMetadata();
  
  ChannelsClient.findOne({ query }, meta, function(err, res) {
    if (err || res.status.failed || !res.channel) {
      const session = nms.getSession(id);
      session.reject();
    } else {
      StreamsClient.addStream({ streamKey }, function(err,res) {
        if (err) {
          console.log(err)
          const session = nms.getSession(id);
          session.reject();
        }
      });
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

function generateMetadata(metadata) {
  const meta = new grpc.Metadata();
  meta.add('x-api-key', process.env.CHANNELS_SERVICE_API_KEY || '');
  if (metadata) {
    for (let key in metadata) {
      meta.add(key, metadata[key]);
    }
  }
  return meta;
}

export default nms;