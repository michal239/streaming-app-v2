require('module-alias/register')
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/resolvers/UserResolver'
import { StreamResolver } from './modules/stream/resolvers/StreamResolver';
import cors from 'cors';

const main = async () => {
  const app = express();
  app.use(cors())
  const schema = await buildSchema({
    resolvers: [UserResolver, StreamResolver]
  })
  
  const apolloServer = new ApolloServer({
    schema
  })

  apolloServer.applyMiddleware({ app });

  app.listen(7000, ()=>console.log('Server started on port 7000'));
}

main();