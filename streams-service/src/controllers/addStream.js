import client from '../redis-setup'

function INITIAL_STATE() {
  return {
    viewers: 0,
    liveSince: Date.now()
  }
}

export default function addStreamController(ctx) {
  client.hset('streams', ctx.req.streamKey, JSON.stringify(INITIAL_STATE()));
}