import React from 'react';
import { useQuery, gql } from '@apollo/client';
import StreamCard from '../../components/StreamCard/StreamCard';
// import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const GET_STREAMS = gql`
  query streams {
    streams {
      viewers
      liveSince
      streamKey
      thumbnail
      category
      title
      user {
        username
      }
    }
  }
`;

const Homepage = () => {
  const { data, loading, error } = useQuery(GET_STREAMS, {
    pollInterval: 3000,
  });
  console.log(data, loading, error);
  if (data) {
    return (
      <div style={{ height: '200vh' }}>
        {data.streams.map((stream: any) => {
          return <StreamCard stream={stream} />;
        })}
      </div>
    );
  }
  return <h2 style={{ marginTop: '60px', height: '200vh' }}>nic</h2>;
};

export default Homepage;
