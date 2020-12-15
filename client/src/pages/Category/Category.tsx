import React from 'react';
import { gql, useQuery } from '@apollo/client';
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
      <div>
        {data.streams
          .filter((stream: any) => stream.category === categoryName)
          .map((stream: any) => {
            return <h2>{stream.user.username}</h2>;
          })}
      </div>
    );
  }
  return <div style={{ marginTop: '100px' }}>{categoryName}</div>;
};

export default Category;
