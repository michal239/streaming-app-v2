import React from 'react';
import './Chat.scss';

const Chat: React.FC = () => {
  const [message, addMsg] = React.useState(['siemka']);
  const [input, setInput] = React.useState('');
  function handleSubmit(e:any) {
    e.preventDefault();
    addMsg(current => [...current, input]);
    setInput('');
  }

  return (
    <div className="chat">
      <div className="chat__navigation">

      </div>
      <div className="chat__messages">
      {message.map(msg => {
        return <div>{msg}</div>
      })}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" className="chat__input" />
      </form>
    </div>
  )
}

export default Chat;