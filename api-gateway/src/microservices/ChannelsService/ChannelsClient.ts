import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

import { ICreateChannelData, IFindOneData } from '@ts/interfaces/ChannelsClient.interface';
import { Channel } from '../../modules/channel/entity/Channel'
import { IMetadata } from '@ts/interfaces/Metadata.interface';
import { RequestFailedError } from '../../utils/errors'

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

function createChannel(data: ICreateChannelData, metadata?: IMetadata): Promise<Channel> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    ChannelsClient.createChannel(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.channel)
      }
    })
  })
}

function findOne(data: IFindOneData, metadata?: IMetadata): Promise<Channel | null> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    ChannelsClient.findOne(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.channel)
      }
    })
  })
}

function generateMetadata(metadata?: IMetadata) {
  const meta = new grpc.Metadata();
  meta.add('x-api-key', 'replacethislater');
  if (metadata) {
    for (let key in metadata) {
      meta.add(key, metadata[key]);
    }
  }
  return meta;
}

export default Object.freeze({
  createChannel,
  findOne
})