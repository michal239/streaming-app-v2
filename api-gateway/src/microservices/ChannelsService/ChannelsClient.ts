import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

import { ICreateChannelData } from '@ts/interfaces/ChannelsClient.interface'

const PROTO_PATH = __dirname + '../../../../../_proto/channel.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const channelProto: any = grpc.loadPackageDefinition(packageDefinition).channel;

const ChannelsClient = new channelProto.ChannelsService('localhost:3001', grpc.credentials.createInsecure());

function createChannel(data: ICreateChannelData) {
  return new Promise((resolve, reject) => {
    ChannelsClient.createChannel(data, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

export default Object.freeze({
  createChannel
})