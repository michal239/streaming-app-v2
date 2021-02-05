import redis from 'redis';

const client = redis.createClient({
  host: 'redis'
});

client.on('error', error => console.log(error));

export default client;