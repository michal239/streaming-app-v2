import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalPortal from '../ModalPortal/ModalPortal';
//@ts-ignore
import avatar from '../../../public/userAvatar.png';
import { useClickOutside } from '../../hooks/useClickOutside';
import { logoutUser } from '../../store/actions/currentUser';
import './UserMenu.scss';

const UserMenu: React.FC<any> = props => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const { currentUser } = props;
  const menu = useRef(null);
  const menuButton = useRef(null);
  useClickOutside([menu, menuButton], () => {
    setDisplayMenu(false);
  });

  return (
    <div>
      <div
        ref={menuButton}
        className="user-menu__avatar"
        onClick={() => setDisplayMenu(state => !state)}
      >
        <img src={avatar} alt="" />
      </div>
      {displayMenu && (
        <ModalPortal>
          <div ref={menu} className="user-menu">
            <Link to={currentUser.user.username}>
              <div className="user-menu__button">
                <i className="user-menu__icon far fa-play-circle"></i>
                Channel
              </div>
            </Link>
            <Link to="/settings">
              <div className="user-menu__button">
                <i className="user-menu__icon fas fa-cog"></i>
                Settings
              </div>
            </Link>
            <div
              className="user-menu__button"
              onClick={() => {
                props.logoutUser();
              }}
            >
              <i className="user-menu__icon fas fa-sign-out-alt"></i>
              Logout
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
