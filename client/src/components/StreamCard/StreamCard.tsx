import React from 'react';
import { Link } from 'react-router-dom';
import './StreamCard.scss';
//@ts-ignore
import avatar from '../../../public/userAvatar.png';

interface StreamCardProps {
  stream: any;
}

const StreamCard: React.FC<StreamCardProps> = props => {
  const { thumbnail, viewers, title, category } = props.stream;
  const { username } = props.stream.user;

  return (
    <div className="stream-card">
      <Link to={username}>
        <div className="inner">
          <img
            src={`data:image/png;base64,${thumbnail}`}
            alt="thumbnail"
            className="stream-card__thumbnail"
          />
          <div className="stream-card__live-label">Live</div>
          <div className="stream-card__viewers">
            {viewers} {viewers === 1 ? 'viewer' : 'viewers'}
          </div>
        </div>
      </Link>
      <div className="stream-card__description">
        <Link to={username}>
          <img className="stream-card__user-avatar" src={avatar} />
        </Link>
        <div style={{ width: '80%' }}>
          <Link to={username}>
            <div className="stream-card__title" title={title}>
              {title}
            </div>
          </Link>
          <Link to={username}>
            <div className="stream-card__username">{username}</div>
          </Link>
          <Link to={'/category/' + category}>
            <div className="stream-card__category">{category}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StreamCard;
