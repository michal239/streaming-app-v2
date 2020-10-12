import React from 'react';
import { gql, useQuery } from '@apollo/client'
import ClipLoader from "react-spinners/ClipLoader";
import ChannelNotFound from '../../components/ChannelNotFound/ChannelNotFound';
import ChannelInfo from '../../components/ChannelInfo/ChannelInfo';
import './ChannelPage.scss';
import Chat from '../../components/Chat/Chat';
const GET_USER = gql`
  query user ($key: String!, $value: String!) {
    user(key: $key, value: $value) {
      id
      username
      channel {
        id
        subscriptions {
          count
        }
      }
      stream {
        viewers
        liveSince
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
      value: username
    }
  });
  console.log(data)
  if (loading) return <section style={{boxSizing: 'border-box', paddingTop: '60px', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><ClipLoader color={'var(--color-main-dark)'} /></section>
  if (error) return <section style={{marginTop: '60px'}}>error: {error.toString()}</section>
  if (!data.user) return <ChannelNotFound username={username}/>

  return (
    <section className="channel-page container-fluid">
      <div className="row">
        <div className="col-9 col-md-12">
          {
            data.user.stream ? 
            <VideoPlayer />
            :
            <div className="channel-page__video-player-placeholder" />
          }
          <ChannelInfo 
            user={data.user}
          />
        </div>
        <Chat />
        {/* <div className="col-3 col-md-12">
          <h3>Ilość subów: {data.user.channel.subscriptions.count}</h3>
        </div> */}

      </div>
    </section>
  );
}

export default ChannelPage;