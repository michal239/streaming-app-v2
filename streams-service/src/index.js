import App from './App'
import path from 'path'

import addStream from './controllers/addStream';
import removeStream from './controllers/removeStream';
import getStreams from './controllers/getStreams';
import getStream from './controllers/getStream';
import setStreamInfo from './controllers/setStreamInfo';
import getThumbnail from './controllers/getThumbnail';
import updateViewers from './jobs/updateViewers';
import updateThumbnails from './jobs/updateThumbnails';

updateViewers.start();
updateThumbnails.start();

const services = {
  addStream,
  removeStream,
  getStreams,
  getStream,
  setStreamInfo,
  getThumbnail
}

const PROTO_PATH = path.resolve(__dirname, './_proto/streams.proto');
const app = new App(PROTO_PATH, 'StreamsService', { server: { PORT: 3000, API_KEY: 'api' } })
app.initServices(services);
app.start();