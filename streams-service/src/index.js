import App from './App'
import path from 'path'
import addStream from './controllers/addStream';
import removeStream from './controllers/removeStream';
import updateViewers from './jobs/updateViewers';
import getStreams from './controllers/getStreams';
import getStream from './controllers/getStream';
import setStreamInfo from './controllers/setStreamInfo';
import jobo from './jobs/generateThumbnails';
updateViewers.start();
jobo.start();

const services = {
  addStream,
  removeStream,
  getStreams,
  getStream,
  setStreamInfo
}

const PROTO_PATH = path.resolve(__dirname, './streams.proto');
const app = new App(PROTO_PATH, 'StreamsService', { server: { PORT: 3005, API_KEY: 'api' } })
app.initServices(services);
app.start();