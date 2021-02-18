import mongoose from 'mongoose';
import path from 'path'
import App from './App';
import grpcCallback from './utils/grpcCallback';
import { createChannel, subscribeChannel, unsubscribeChannel, findOne } from './controllers';
import { checkSource } from './middleware';

mongoose.connect(`mongodb://${process.env.CHANNELS_SERVICE_DB_USERNAME}:${process.env.CHANNELS_SERVICE_DB_PASSWORD}@db/channels-service`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}, (error) => {
  console.log(error ? error : 'Connected to the database')
});

const services = {
  createChannel: grpcCallback(createChannel),
  subscribeChannel: grpcCallback(subscribeChannel),
  unsubscribeChannel: grpcCallback(unsubscribeChannel),
  findOne: grpcCallback(findOne)
}
const PROTO_PATH = path.resolve(__dirname, './_proto/channel.proto');
const app = new App(PROTO_PATH, 'ChannelsService', { server: { PORT: 3000, API_KEY: process.env.CHANNELS_SERVICE_API_KEY } })

app.initMiddleware(checkSource);
app.initServices(services);
app.start();