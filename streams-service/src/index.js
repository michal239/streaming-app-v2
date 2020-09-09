import App from './App'
import path from 'path'
import addStream from './controllers/addStream';
import removeStream from './controllers/removeStream';
import updateViewers from './jobs/updateViewers';

updateViewers.start();

const services = {
  addStream,
  removeStream
}

const PROTO_PATH = path.resolve(__dirname, './streams.proto');
const app = new App(PROTO_PATH, 'StreamsService', { server: { PORT: 3000, API_KEY: 'api' } })
app.initServices(services);
app.start();