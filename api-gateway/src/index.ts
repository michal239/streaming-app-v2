require('module-alias/register')

import UsersClient from './microservices/UsersService/UsersClient';
import ChannelsClient from './microservices/ChannelsService/ChannelsClient';

async function main() {
  try {
    const res = await ChannelsClient.createChannel({ userId: '5f6cd1d12fbe0406f8c6b7b8' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main()