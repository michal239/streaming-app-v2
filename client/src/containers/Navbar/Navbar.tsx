import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.scss';

import Logo from '../../components/icons/Logo';
import AuthButtons from '../../components/AuthButtons/AuthButtons';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserMenu from '../../components/UserMenu/UserMenu';

const Navbar: React.FC<any> = ({ currentUser }) => {
  const navbar = useRef<HTMLDivElement>(null);
  const navbarInner = useRef<HTMLDivElement>(null);

  const changeView = () => {
    if (navbarInner.current) {
      navbarInner.current.classList.toggle('navbar__inner--display--front');
      navbarInner.current.classList.toggle('navbar__inner--display--back');
    }
  };

  return (
    <div ref={navbar} className="navbar">
      <div ref={navbarInner} className="navbar__inner navbar__inner--display--front">
        <div className="navbar__item navbar__item--front container">
          <div className="row">
            <div style={{ display: 'flex' }} className="col-12 space-between">
              <Link to="/">
                <Logo className="navbar__logo" />
              </Link>
              <nav className="navbar__navigation-wraper">
                <i onClick={() => changeView()} className="fas fa-search navbar__search-icon"></i>
                {currentUser.isAuthenticated ? <UserMenu /> : <AuthButtons />}
              </nav>
            </div>
          </div>
        </div>
        <div className="navbar__item navbar__item--back container">
          <div style={{ justifyContent: 'center', alignItems: 'center' }} className="row">
            <div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className="col-8 col-sm-12"
            >
              <i className="fas fa-search"></i>
              <SearchBar />
              <i className="fas fa-times navbar__close-icon" onClick={() => changeView()}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Navbar);
