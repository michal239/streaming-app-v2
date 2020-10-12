import React from 'react';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import './ChannelInfo.scss';
const ChannelInfo: React.FC<any> = (props) => {
  const { user } = props;
  console.log('channelinfo: ', user)
  return (
    <div className="channel-info">
      <div className="channel-info__stream-info">
        <div>
          {/* logo here */}
          <div>
            <h3 className="channel-info__username">{user.username}</h3>
            <p className="channel-info__subscriptions">subscriptions: {user.channel.subscriptions.count}</p>
            {user.stream && <p>{user.stream.title}</p>}
            {user.stream && <p>{user.stream.category}</p>}
          </div>
        </div>
        <div>
          <SubscribeButton />
          <div className="channel-info__stream-stats">
            {user.stream && <span>{user.stream.viewers}</span>}
          </div>
        </div>
      </div>
      <div className="channel-info__description"></div>
    </div>
  );
}

export default ChannelInfo;