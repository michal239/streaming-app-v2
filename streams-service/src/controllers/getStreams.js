import client from '../redis-setup';

function HGetAll() {
  return new Promise((resolve, reject) => {
    client.hgetall('streams', (err, res) => {
      resolve(res);
    })
  })
}

export default async function getStreamsController(ctx) {
  const streams = [];
  const res = await HGetAll();
  for (let stream in res) {
    const parsedStreamInfo = JSON.parse(res[stream])
    streams.push({
      ...parsedStreamInfo,
      streamKey: stream
    })
  }
  
  ctx.response.res = { streams };
}