import React from 'react';
import { gql, useQuery } from '@apollo/client';
import StreamCard from '../../components/StreamCard/StreamCard';

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

const Category: React.FC<any> = props => {
  const { categoryName } = props.match.params;
  const { data } = useQuery(GET_STREAMS);
  if (data) {
    return (
      <div style={{ marginTop: '100px' }}>
        <div className="container">
          {data.streams.filter((stream: any) => stream.category === categoryName).length === 0 ? (
            <h2 style={{ marginLeft: '10px' }}>
              Currently no one is streaming{' '}
              <span style={{ color: 'var(--color-main-blue)' }}>{categoryName}</span>
            </h2>
          ) : (
            <h2 style={{ marginLeft: '10px' }}>
              Live channels streaming{' '}
              <span style={{ color: 'var(--color-main-blue)' }}>{categoryName}</span>
            </h2>
          )}
          <div className="row">
            {data.streams
              .filter((stream: any) => stream.category === categoryName)
              .map((stream: any) => {
                return (
                  <div className="col-3 col-sm-6" key={stream.user.username}>
                    <StreamCard stream={stream} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return <div style={{ marginTop: '100px' }}>{categoryName}</div>;
};

export default Category;
