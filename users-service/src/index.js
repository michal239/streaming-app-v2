require('dotenv').config()
import express from 'express';

import setupDatabase from './setup/setupDatabase';
import { registerUser, loginUser } from './controllers';
import makeCallback from './helpers/express-callback';
import bodyParser from 'body-parser';


const server = express();
server.use(bodyParser.json())

server.post('/user', makeCallback(registerUser))
server.post('/login', makeCallback(loginUser));

setupDatabase();
server.listen(5000, console.log('Server started on 5000'));