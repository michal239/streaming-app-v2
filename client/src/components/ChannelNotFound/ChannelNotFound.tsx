import React from 'react';
import './ChannelNotFound.scss';

interface ChannelNotFoundProps {
	username?: string;
}

const ChannelNotFound: React.FC<ChannelNotFoundProps> = props => {
	return (
		<div className="channel-not-found">
			Channel -&nbsp;<span>{props.username}</span>&nbsp;- does not exist ;(
		</div>
	);
};

export default ChannelNotFound;
