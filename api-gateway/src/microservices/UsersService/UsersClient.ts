import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

import { ILoginData, IRegisterData } from '@ts/interfaces/UsersClient.interface'
import { User } from '../../modules/user/entity/User';
import { IMetadata } from '@ts/interfaces/Metadata.interface'
import { RequestFailedError } from '../../utils/errors'

const PROTO_PATH = '/app/_proto/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

const UsersClient = new userProto.UsersService('users-service:7001', grpc.credentials.createInsecure());

function login(data: ILoginData, metadata?: IMetadata): Promise<string> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    UsersClient.login(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.token)
      }
    })
  })
}

function register(data: IRegisterData, metadata?: IMetadata): Promise<User> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    UsersClient.register(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.user)
      }
    })
  })
}

function find(data: any, metadata?: IMetadata): Promise<Array<User>> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    UsersClient.find(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.users)
      }
    })
  })
}

function findRegexp(data: any, metadata?: IMetadata): Promise<Array<User>> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    UsersClient.findRegexp(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.users);
      }
    })
  })
}

function findOne(data: any, metadata?: IMetadata): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const meta = generateMetadata(metadata);
    UsersClient.findOne(data, meta, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else if (res.status.failed) {
        reject(new RequestFailedError(res.status))
      } else {
        resolve(res.user)
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
  login,
  register,
  find,
  findOne,
  findRegexp
});