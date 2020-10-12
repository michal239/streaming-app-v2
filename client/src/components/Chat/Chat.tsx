import React from 'react';
import './Chat.scss';

const Chat: React.FC = () => {
  function handleSubmit(e:any) {
    e.preventDefault();
    console.log(e)
  }

  return (
    <div className="chat">
      <div className="chat__navigation">

      </div>
      <div className="chat__messages">

      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" className="chat__input"/>
      </form>
    </div>
  )
}

export default Chat;