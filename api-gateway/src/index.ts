require('module-alias/register')
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/resolvers/UserResolver'
const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  
  const apolloServer = new ApolloServer({
    schema
  })

  apolloServer.applyMiddleware({ app })

  app.listen(8000, ()=>console.log('Server started on port 8000'));
}

main();