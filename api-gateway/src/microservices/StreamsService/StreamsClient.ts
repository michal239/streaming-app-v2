import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { Stream } from '../../modules/stream/entity/Stream';

const PROTO_PATH = __dirname + '../../../../../_proto/streams.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const streamProto: any = grpc.loadPackageDefinition(packageDefinition).streams;

const StreamsClient = new streamProto.StreamsService('localhost:3005', grpc.credentials.createInsecure());

function getStream(data: any): Promise<Stream | null> {
  return new Promise((resolve, reject) => {
    StreamsClient.getStream(data, (err:any, res:any) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.stream)
      }
    })
  })
}

export default Object.freeze({
  getStream
})