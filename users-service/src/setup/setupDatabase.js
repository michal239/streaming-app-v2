import mongoose from 'mongoose';

export default function() {
  mongoose.connect('mongodb://localhost/users-service', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to database');
  })
}