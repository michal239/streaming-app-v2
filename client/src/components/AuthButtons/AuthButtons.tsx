import React from 'react';

const AuthButtons: React.FC = () => {
  return (
    <div>
      <button style={{marginLeft: "5px"}} className="navbar__button">Login</button>
      <button className="navbar__button navbar__button--bold">Register</button>
    </div>
  );
}

export default AuthButtons;