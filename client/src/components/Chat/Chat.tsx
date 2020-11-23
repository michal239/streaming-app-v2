import React, { useState, useEffect } from 'react';
import './Chat.scss';
import { connect } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import Modal from '../Modal/Modal';
import ModalPortal from '../ModalPortal/ModalPortal';
import AuthForm from '../AuthForm/AuthForm';

interface ChatProps {
	username: string;
	currentUser?: any;
}

function randomizeColor(): string {
	const red = Math.round(Math.random() * 255);
	const green = Math.round(Math.random() * 255);
	const blue = Math.round(Math.random() * 255);
	return `rgb(${red}, ${green}, ${blue})`;
}
let socket: Socket;

const Chat: React.FC<ChatProps> = props => {
	const [input, setInput] = useState('');
	const [userMessageColor] = useState(() => randomizeColor());
	const [messages, setMessages] = useState<any[]>([]);
	const [showAuthForm, setShowAuthForm] = useState(false);
	const { currentUser, username } = props;

	useEffect(() => {
		socket = io(`http://localhost:5000/${username}`);
		socket.on('chat message', (msg: any) => {
			console.log('incoming msg: ', msg);
			setMessages(state => [...state, msg]);
		});
	}, []);

	function handleSubmit(e: any) {
		e.preventDefault();
		if (!input) return;
		const newMessage = {
			username: currentUser.user.username,
			textColor: userMessageColor,
			message: input,
		};
		socket.emit('chat message', newMessage);
		setInput('');
	}

	return (
		<div className="chat">
			<div className="chat__navigation"></div>
			<div className="chat__messages">
				{messages.map(msg => {
					return (
						<div>
							<span style={{ color: msg.textColor }}>{msg.username}: </span>
							{msg.message}
						</div>
					);
				})}
			</div>
			{currentUser.isAuthenticated ? (
				<form onSubmit={handleSubmit}>
					<input
						value={input}
						onChange={e => {
							setInput(e.target.value);
						}}
						type="text"
						className="chat__input"
						placeholder="message..."
					/>
				</form>
			) : (
				<div onClick={() => setShowAuthForm(true)} className="">
					Log in to Chat
				</div>
			)}
			{showAuthForm && (
				<ModalPortal>
					<Modal>
						<AuthForm closeModal={() => setShowAuthForm(false)} />
					</Modal>
				</ModalPortal>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps)(Chat);
