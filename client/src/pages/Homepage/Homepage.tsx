import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { ClipLoader } from 'react-spinners';
import StreamCard from '../../components/StreamCard/StreamCard';
import Categories from './Categories';

const GET_STREAMS = gql`
  query streams {
    streams {
      viewers
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
  const { data, loading } = useQuery(GET_STREAMS);

  if (loading)
    return (
      <div style={{ width: '100vw', height: '100vh' }} className="flex-center">
        <ClipLoader />
      </div>
    );

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="container">
        <h2 style={{ marginLeft: '10px' }}>Live channels</h2>
        <div className="row">
          {data.streams
            .filter((stream: any, index: number) => {
              return index < 8;
            })
            .map((stream: any) => {
              return (
                <div className="col-3 col-sm-6" key={stream.user.username}>
                  <StreamCard stream={stream} />
                </div>
              );
            })}
        </div>
        <hr />
      </div>
      <Categories />
    </div>
  );
};

export default Homepage;
