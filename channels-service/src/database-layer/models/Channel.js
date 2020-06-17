import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  streamKey: { type: String },
  views: { type: Number, default: 0 },
  subscriptions: {
    count: { type: Number, default: 0},
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
});

const Channel = new mongoose.model('Channel', channelSchema);

export default Channel;