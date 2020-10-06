import client from '../redis-setup';

// function HGet() {

// }

export default async function getStreamController(ctx) {
  const res = await new Promise((resolve, reject) => {client.hget('streams', ctx.req.streamKey, (err, res) => {
    const parsedResponse = JSON.parse(res);
    resolve(parsedResponse)
  })})
  if (res) {
    ctx.res = { stream: { ...res, streamKey: ctx.req.streamKey } }
  } else {
    ctx.res = { stream: null }
  }
  
}