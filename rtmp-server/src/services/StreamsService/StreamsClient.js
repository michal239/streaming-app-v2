import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = __dirname + '../../../../../_proto/streams.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const channelProto = grpc.loadPackageDefinition(packageDefinition).streams;

const StreamsClient = new channelProto.StreamsService('localhost:3005', grpc.credentials.createInsecure());

export default StreamsClient;
