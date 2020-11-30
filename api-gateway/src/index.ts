require('module-alias/register')
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { AuthChecker, buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql'

import { UserResolver } from './modules/user/resolvers/UserResolver'
import { AuthResolver } from './modules/user/resolvers/AuthResolver';
import { StreamResolver } from './modules/stream/resolvers/StreamResolver';
import { ChannelResolver } from './modules/channel/resolvers/ChannelResolver';

const authChecker: AuthChecker<any> = ({ context }) => {
  return !!context.user;
}

const main = async () => {

  const app = express();

  app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
  }));
  
  app.use(cookieParser());
  
  app.use((req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
      try {
        const verified = jwt.verify(token, 'sdw12dsa');
        req.user = verified;
      } catch (err) {
        res.clearCookie('token');
        req.user = undefined;
      }
    } else {
      req.user = undefined;
    }
    next();
  })

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: await buildSchema({
        resolvers: [UserResolver, AuthResolver, StreamResolver, ChannelResolver],
        authChecker
      }),
      graphiql: true
    })
  )

  app.listen(7000, () => console.log('Server started on port 7000'));
}

main();