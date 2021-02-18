import mongoose from 'mongoose';
import path from 'path';
import App from './App';
import grpcCallback from './utils/grpcCallback';
import { checkSource } from './middleware'
import { registerUser, loginUser, find, findOne, findById, findRegexp } from './controllers';

mongoose.connect(`mongodb://${process.env.USERS_SERVICE_DB_USERNAME}:${process.env.USERS_SERVICE_DB_PASSWORD}@db/users-service`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}, (error) => {
  console.log(error ? error : 'Connected to the database')
});

const services = {
  login: grpcCallback(loginUser),
  register: grpcCallback(registerUser),
  find: grpcCallback(find),
  findOne: grpcCallback(findOne),
  findById: grpcCallback(findById),
  findRegexp: grpcCallback(findRegexp)
}
const PROTO_PATH = path.resolve(__dirname, './_proto/user.proto');
const app = new App(PROTO_PATH, 'UsersService', { server: { PORT: 3000, API_KEY: process.env.USERS_SERVICE_API_KEY } });

app.initMiddleware(checkSource);
app.initServices(services);
app.start();

