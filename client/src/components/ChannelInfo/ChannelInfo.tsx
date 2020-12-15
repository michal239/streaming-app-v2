import React, { useEffect, useState } from 'react';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import { Link } from 'react-router-dom';

//@ts-ignore
import avatar from '../../../public/userAvatar.png';
import './ChannelInfo.scss';

interface TimerProps {
  initTime: number;
}

const Timer: React.FC<TimerProps> = ({ initTime }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const difference = Math.round((Date.now() - initTime) / 1000);
      setTime(difference);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <span>{`${Math.floor(time / 3600)}:${Math.floor(time / 60) % 60}:${time % 60}`}</span>;
};

const ChannelInfo: React.FC<any> = props => {
  const { user } = props;

  return (
    <div className="channel-info">
      <div className="channel-info__stream-info">
        <div className="flex-center">
          <div className="channel-info__logo">
            <img style={{ borderColor: user.stream && 'red' }} src={avatar} alt="user avatar" />
            {user.stream ? (
              <span className="channel-info__label channel-info__label--online">Live</span>
            ) : (
              <span className="channel-info__label">Offline</span>
            )}
          </div>
          <div style={{ marginLeft: '12px' }}>
            <h3 className="channel-info__username">{user.username}</h3>
            {user.stream && <h5 className="channel-info__title">{user.stream.title}</h5>}
            {user.stream && (
              <Link className="channel-info__category" to={'/category/' + user.stream.category}>
                {user.stream.category}
              </Link>
            )}
            <p className="channel-info__subscriptions">
              subscriptions: {user.channel.subscriptions.count}
            </p>
          </div>
        </div>
        <div>
          <SubscribeButton />
          <div className="channel-info__stream-stats">
            {user.stream && (
              <span className="channel-info__viewers">
                <i style={{ marginRight: '2px' }} className="fas fa-user-friends"></i>
                {user.stream.viewers}
              </span>
            )}
            {user.stream && <Timer initTime={user.stream.liveSince} />}
          </div>
        </div>
      </div>
      <div className="channel-info__description"></div>
    </div>
  );
};

export default ChannelInfo;
