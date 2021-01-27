import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { Stream } from '../../modules/stream/entity/Stream';


const PROTO_PATH = '/app/_proto/streams.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const streamProto: any = grpc.loadPackageDefinition(packageDefinition).streams;

const StreamsClient = new streamProto.StreamsService('streams-service:7003', grpc.credentials.createInsecure());

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

function getStreams(): Promise<Array<Stream>> {
  return new Promise((resolve, reject) => {
    StreamsClient.getStreams({}, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.streams);
      }
    })
  })
}

function setStreamInfo(data: any) {
  return new Promise((resolve, reject) => {
    StreamsClient.setStreamInfo(data, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

function getThumbnail(data: any) {
  return new Promise((resolve, reject) => {
    StreamsClient.getThumbnail(data, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.data);
      }
    })
  })
}

export default Object.freeze({
  getStream,
  getStreams,
  setStreamInfo,
  getThumbnail
})