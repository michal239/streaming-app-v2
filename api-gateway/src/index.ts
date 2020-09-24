require('module-alias/register')

import UsersClient from './microservices/UsersService/UsersClient';

async function main() {
  try {
    const res = await UsersClient.register({email:'dasd@o2.pl', password: 'dasd2d1asd', username: 'maciek'});
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main()