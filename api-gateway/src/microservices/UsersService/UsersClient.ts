import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

import { ILoginData, IRegisterData } from '@ts/interfaces/UsersClient.interface'

const PROTO_PATH = __dirname + '../../../../../_proto/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

const UsersClient = new userProto.UsersService('localhost:3000', grpc.credentials.createInsecure());

function login(data: ILoginData) {
  return new Promise((resolve, reject) => {
    UsersClient.login(data, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

function register(data: IRegisterData) {
  return new Promise((resolve, reject) => {
    UsersClient.register(data, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

export default Object.freeze({
  login,
  register
});