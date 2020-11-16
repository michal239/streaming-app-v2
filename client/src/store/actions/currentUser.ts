import { LOG_IN } from '../actionTypes';
import jwt from 'jsonwebtoken';
import { gql } from '@apollo/client';
import { client } from '../../App';

import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux'

const GET_USER = gql`
	query user($key: String!, $value: String!) {
		user(key: $key, value: $value) {
			id
			username
			email
		}
	}
`;

export const loginUser = (token: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		const decoded = jwt.decode(token);

		let user;
		try {
			const { data } = await client.query({
				query: GET_USER,
				variables: {
					key: '_id',
					value: (decoded as any).id,
				},
			});
			user = data.user;
		} catch (e) {
			user = {};
		}

		dispatch({
			type: LOG_IN,
			user,
		});
	};
};
