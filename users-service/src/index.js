import express from 'express';

import setupDatabase from './setup/setupDatabase';

const server = express();

setupDatabase();
server.listen(5000, console.log('server started on 5000'));