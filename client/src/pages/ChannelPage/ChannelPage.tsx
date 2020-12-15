import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ClipLoader from 'react-spinners/ClipLoader';
import ChannelNotFound from '../../components/ChannelNotFound/ChannelNotFound';
import ChannelInfo from '../../components/ChannelInfo/ChannelInfo';
import './ChannelPage.scss';
import Chat from '../../components/Chat/Chat';
const GET_USER = gql`
  query user($key: String!, $value: String!) {
    user(key: $key, value: $value) {
      id
      username
      channel {
        id
        streamKey
        subscriptions {
          count
        }
      }
      stream {
        viewers
        liveSince
        category
        title
      }
    }
  }
`;
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const ChannelPage: React.FC = (props: any) => {
  const { username } = props.match.params;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      key: 'username',
      value: username,
    },
  });

  if (loading)
    return (
      <section className="flex-center">
        <ClipLoader color={'var(--color-main-dark)'} />
      </section>
    );
  if (error) return <section style={{ marginTop: '60px' }}>error: {error.toString()}</section>;
  if (!data.user) return <ChannelNotFound username={username} />;

  return (
    <section className="channel-page container-fluid">
      <div className="row">
        <div className="col-9 col-md-12">
          <VideoPlayer streamKey={data.user.channel.streamKey} />
          <ChannelInfo user={data.user} />
          <Chat username={username} />
        </div>
      </div>
    </section>
  );
};

export default ChannelPage;
