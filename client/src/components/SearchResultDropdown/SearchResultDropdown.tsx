import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';

import ModalPortal from '../ModalPortal/ModalPortal';
//@ts-ignore
import avatar from '../../../public/userAvatar.png';
import './SearchResultDropdown.scss';

interface SearchResultDropdownProps {
	users: Array<any>;
}

const SearchResultCard: React.FC<any> = ({ user }) => {
	const { username } = user;

	return (
		<Link to={'/' + username}>
			<div className="card">
				<div className="card__element" style={{ display: 'flex', alignItems: 'center' }}>
					<img src={avatar} />
					<div className="card__username">{username}</div>
				</div>
				{user.stream && (
					<div className="card__element">
						<div className="card__viewers">
							<i className="fas fa-user-friends" style={{ marginRight: '5px' }}></i>
							{user.stream.viewers}
						</div>
						<div className="card__live-label">Live</div>
					</div>
				)}
			</div>
		</Link>
	);
};

const SearchResultDropdown: React.FC<SearchResultDropdownProps> = ({ users }) => {
	const [displayDropdown, setDisplayDropdown] = useState(true);
	const dropdown = useRef(null);
	useClickOutside(dropdown, () => {
		setDisplayDropdown(false);
	});

	useEffect(() => {
		setDisplayDropdown(true);
	}, [users]);

	if (!Array.isArray(users) || users.length === 0 || !displayDropdown) {
		return null;
	}

	return (
		<ModalPortal>
			<div className="container search-result">
				<div style={{ justifyContent: 'center' }} className="row">
					<div ref={dropdown} className="col-8 search-result__inner">
						{users.map(user => {
							return <SearchResultCard key={user.username} user={user} />;
						})}
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default SearchResultDropdown;
