import React, { useState } from 'react';
import './Chat.scss';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import ModalPortal from '../ModalPortal/ModalPortal';
import AuthForm from '../AuthForm/AuthForm';

const Chat: React.FC<any> = props => {
	const [message, addMsg] = useState(['siemka']);
	const [input, setInput] = useState('');
	const [showAuthForm, setShowAuthForm] = useState(false);
	const { currentUser } = props;
	function handleSubmit(e: any) {
		e.preventDefault();
		addMsg(current => [...current, input]);
		setInput('');
	}
	return (
		<div className="chat">
			<div className="chat__navigation"></div>
			<div className="chat__messages">
				{message.map(msg => {
					return <div>{msg}</div>;
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
