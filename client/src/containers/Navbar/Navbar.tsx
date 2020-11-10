import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

import Logo from '../../icons/Logo';
import AuthButtons from '../../components/AuthButtons/AuthButtons';
import SearchBar from '../../components/SearchBar/SearchBar';
const Navbar: React.FC = () => {
  const navbar = useRef<HTMLDivElement>(null);
  const navbarInner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  let previousScrollValue = 0; //a way better performance vs useState
  const handleScroll = () => {
    if (window.scrollY > previousScrollValue && window.scrollY > 60) {
      if(navbar.current) navbar.current.classList.add('hidden')
    } else {
      if(navbar.current) navbar.current.classList.remove('hidden')
    }
    previousScrollValue = window.scrollY; 
  }
  
  const changeView = () => {
    if(navbarInner.current) {
      navbarInner.current.classList.toggle('navbar__inner--display--front')
      navbarInner.current.classList.toggle('navbar__inner--display--back')
    }
  }
  
  return (
    <div ref={navbar} className="navbar">
      <div ref={navbarInner} className="navbar__inner navbar__inner--display--front">
        <div className="navbar__item navbar__item--front container">
          <div className="row">
            <div style={{display: 'flex'}} className="col-12 space-between">
              <Link to="/">
                <Logo />
              </Link>
              <nav className="navbar__navigation-wraper">
                <i onClick={() => changeView()} className="fas fa-search navbar__search-icon"></i>
                <AuthButtons />
              </nav>
            </div>
          </div>
        </div>
        <div className="navbar__item navbar__item--back container">
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="row">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="col-8">
              <i className="fas fa-search"></i>
              <SearchBar />
              <i style={{fontSize: "20px"}} className="fas fa-times navbar__close-icon" onClick={() => changeView()}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;