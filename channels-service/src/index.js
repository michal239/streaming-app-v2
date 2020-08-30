import mongoose from 'mongoose';
import database from './database-layer/models/Channel';

mongoose.connect('mongodb://localhost/channels-service', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}, () => {
  console.log('connected')
});


import { editChannel, addChannel, addSubscription } from './use-cases';
import { createChannel } from './controllers';


  // addSubscription({channelId: '5eeb9a7aff576b08407d0f4f', userId: '5eebebe13aac7f1ab49cd8e6'}).then(res => console.log(res))
  // .catch(err => {
  //   console.log(err.message)
  // })

  createChannel({userId: '' })


// subscribeChannel({userId:'5eebebe12aac7f1ab49cd8e6', channelId: '5eeb9a7aff576b08407d0f4f'})
// // addChannel('5ea61bf7c2dd522894c69548').then(res => { console.log(res) })
// editChannel('5eeb94912aac7f1ab49cd8e6')
// const channel = makeChannel({userId: '201300'});
// const chan = {
//   userId: channel.getUserId(),
//   streamKey: channel.getStreamKey(),
//   subscriptions: channel.getSubscriptions(),
//   views: channel.getViews()
// }

// console.log(chan)
// const chars = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,q,u,w,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,Q,U,W,Z,0,1,2,3,4,5,6,7,8,9]
// for (let i = 48; i < 58; i++) {
//   console.log(String.fromCharCode(i))
// }