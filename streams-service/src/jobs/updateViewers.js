import client from '../redis-setup';
import { CronJob } from 'cron';
import request from 'request';

const job = new CronJob('0/5 * * * * *', function() {
  updateViewers();
}, null, true, 'America/Los_Angeles');

function updateViewers() {
  request('http://localhost:8888/api/streams', function(error, response, body) {
    if (error) return;
    const streams = JSON.parse(body).live;

    for (const stream in streams) {
      client.hget('streams', stream, function(err, res) {
        if (!err && res) {
          let oldStream = JSON.parse(res);
          oldStream.viewers = streams[stream].subscribers.length;
          client.hset('streams', stream, JSON.stringify(oldStream), function(err,res){});
        }
      })
    }
  })
}

export default job;