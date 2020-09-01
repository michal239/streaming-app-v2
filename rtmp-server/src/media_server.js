import NodeMediaServer from 'node-media-server';
import { rtmp_server as config } from './config';

const nms = new NodeMediaServer(config);

nms.run();

export default nms;