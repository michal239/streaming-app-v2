import redis from 'redis';

const client = redis.createClient();

client.on('error', error => console.log(error));

export default client;