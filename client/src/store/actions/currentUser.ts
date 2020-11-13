import { LOG_IN } from '../actionTypes';
import jwt from 'jsonwebtoken';
import { gql } from '@apollo/client';
import { client } from '../../App';

const GET_USER = gql`
	query user($key: String!, $value: String!) {
		user(key: $key, value: $value) {
			id
			username
			email
		}
	}
`;

export const loginUser = (token: string) => {
	return async (dispatch: any) => {
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
