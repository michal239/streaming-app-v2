require('dotenv').config()
// import express from 'express';

import setupDatabase from './setup/setupDatabase';
import { registerUser, loginUser } from './controllers';
// import makeCallback from './helpers/express-callback';
// import bodyParser from 'body-parser';
import path from 'path';
import App from './App';
import { checkSource } from './middleware'
import grpcCallback from './utils/grpcCallback';
const PROTO_PATH = path.resolve(__dirname, './_proto/user.proto');
// const server = express();
// server.use(bodyParser.json())
// server.get('/', (req, res) => {
//   
// })
// server.post('/user', makeCallback(registerUser))
// server.post('/login', makeCallback(loginUser));
const services = {
  login: grpcCallback(loginUser),
  register: grpcCallback(registerUser)
}
const app = new App(PROTO_PATH, 'UserService', { server: { PORT: 3000, API_KEY: 'api' } });
app.initMiddleware(checkSource);
app.initServices(services);
app.start();
setupDatabase();
