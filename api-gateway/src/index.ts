require('module-alias/register')
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql'

import { UserResolver } from './modules/user/resolvers/UserResolver'
import { StreamResolver } from './modules/stream/resolvers/StreamResolver';
import { ChannelResolver } from './modules/channel/resolvers/ChannelResolver';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, StreamResolver, ChannelResolver]
  })
  const app = express();

  app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
  }));
  
  app.use(cookieParser());
  
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )

  app.listen(7000, ()=>console.log('Server started on port 7000'));
}

main();