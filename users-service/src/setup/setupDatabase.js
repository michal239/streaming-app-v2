import mongoose from 'mongoose';

export default function() {
  mongoose.connect('mongodb://db/users-service', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to database');
  })
}