import { ChatServer } from './ChatServer';
import express from 'express';

const app = express();

const server = app.listen(5000)

new ChatServer(server)