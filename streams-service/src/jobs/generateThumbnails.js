import { CronJob } from 'cron';
import client from '../redis-setup';
import { generateStreamThumbnail } from '../utils/generateThumbnail';

/* 
  RUNS EVERY 60sec
*/
const job = new CronJob('*/1 * * * *', function() {
  client.hgetall('streams', (err, res) => {
    for (const streamKey in res) {
      generateStreamThumbnail(streamKey);
    }
  })
}, null, true, 'America/Los_Angeles');

export default job;