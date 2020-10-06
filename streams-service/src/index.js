import App from './App'
import path from 'path'
import addStream from './controllers/addStream';
import removeStream from './controllers/removeStream';
import updateViewers from './jobs/updateViewers';
import getStreams from './controllers/getStreams';
import getStream from './controllers/getStream';

updateViewers.start();

const services = {
  addStream,
  removeStream,
  getStreams,
  getStream
}

const PROTO_PATH = path.resolve(__dirname, './streams.proto');
const app = new App(PROTO_PATH, 'StreamsService', { server: { PORT: 3005, API_KEY: 'api' } })
app.initServices(services);
app.start();