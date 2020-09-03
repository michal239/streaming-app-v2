import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';


const PROTO_PATH = __dirname + '../../../../../channels-service/src/_proto/channel.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const channelProto = grpc.loadPackageDefinition(packageDefinition).channel;

const ChannelsClient = new channelProto.ChannelService('localhost:3000', grpc.credentials.createInsecure());

export default ChannelsClient;
