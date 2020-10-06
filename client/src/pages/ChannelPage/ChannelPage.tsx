import React from 'react';
import { gql, useQuery } from '@apollo/client'
import ClipLoader from "react-spinners/ClipLoader";
import ChannelNotFound from '../../components/ChannelNotFound/ChannelNotFound'
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
  if (loading) return <div style={{marginTop: '60px'}}><ClipLoader color={'var(--color-main-dark)'} /></div>
  if (error) return <div style={{marginTop: '60px'}}>error: {error.toString()}</div>
  if (!data.user) return <ChannelNotFound username={username}/>

  return (
    <div style={{marginTop: '60px'}}>
      <h1>This is channel page of: {data.user.username}</h1>
      <h3>Ilość subów: {data.user.channel.subscriptions.count}</h3>
      <ClipLoader color={'var(--color-main-dark)'} />
      <VideoPlayer />
    </div>
  );
}

export default ChannelPage;