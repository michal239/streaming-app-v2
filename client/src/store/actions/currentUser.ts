import { LOG_IN, LOG_OUT } from '../actionTypes';
// import jwt from 'jsonwebtoken';
import { gql } from '@apollo/client';
import { client } from '../../App';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;

const LOG_OUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export const loginUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const { data } = await client.query({
        query: ME
      });
      dispatch({
        type: LOG_IN,
        user: data.me
      })
    } catch (e) {
      dispatch({
        type: LOG_OUT,
      });
    }
  };
};

export const logoutUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await client.mutate({
        mutation: LOG_OUT_MUTATION
      })
    } catch (e) {}
    dispatch({
      type: LOG_OUT
    })
  }
};
