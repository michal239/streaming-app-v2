import client from '../redis-setup'

export default function removeStreamController(ctx) {
  client.hdel('streams', ctx.req.streamKey);
}