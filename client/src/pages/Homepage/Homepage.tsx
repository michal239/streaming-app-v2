import React from 'react';
import { useQuery, gql } from '@apollo/client';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const GET_STREAMS = gql`
  query streams {
    streams {
      viewers
      liveSince
      streamKey
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
      <div>
        {
          //@ts-ignore
          data.streams.map(stream => {
            return <VideoPlayer streamKey={stream.streamKey} />;
          })
        }
      </div>
    );
  }
  return <h2 style={{ marginTop: '60px', height: '200vh' }}>nic</h2>;
};

export default Homepage;
