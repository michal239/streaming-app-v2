import mongoose from 'mongoose';
import database from './database-layer/models/Channel';

mongoose.connect('mongodb://localhost/channels-service', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}, () => {
  console.log('connected')
});

// database.create({
//   views: 2000,
//   subscriptions: {
//     count: 1000,
//     subscribers: ['5ea61bf7c1dd522894c69548']
//   }
// })