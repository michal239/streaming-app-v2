import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import NotLoggedIn from '../../components/NotLoggedIn/NotLoggedIn';
import './Settings.scss';

const GET_STREAM_KEY = gql`
  query Channel($userId: String!) {
    channel(userId: $userId) {
      streamKey
    }
  }
`;

const Settings: React.FC<any> = ({ currentUser }) => {
  const [fetch, { data }] = useLazyQuery(GET_STREAM_KEY);

  useEffect(() => {
    if (!currentUser.isAuthenticated) return;
    fetch({
      variables: {
        userId: currentUser.user.id,
      },
    });
  }, [currentUser]);

  if (!currentUser.isAuthenticated) return <NotLoggedIn />;
  return (
    <div className="container settings">
      <div className="row">
        <div className="col-12">
          <p>
            <h3>RTMP Url: rtmp://127.0.0.1:1935/live</h3>
          </p>
          <p>
            <h3>Stream key: {data && data.channel.streamKey}</h3>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Settings);
