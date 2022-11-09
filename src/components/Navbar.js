import React, { useState } from 'react';   
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Office_Gossip_Logo.PNG';

function Navbar() {
  const user = false;
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  

  // Needs work, there are better ways to route but it might take too much time to work out
  if (!user) {
    
    return (
    <>
      <nav className='navbar'>
        <div className='navLogo'>
          {/* <img src={logo} /> */}
        </div>
        <Link to='/Login' className='navbar-logo' onClick={closeMobileMenu}>
          OFFICE GOSSIP
          <i className='fab fa-firstdraft' />
        </Link>
        <Link to='/Admin' className='nav-links' onClick={closeMobileMenu}>
          Admin
        </Link>
        <Link to='/ContactUs' className='nav-links' onClick={closeMobileMenu}>
          Contact
        </Link>
        <Link to='/Logout'className='nav-links-mobile'onClick={closeMobileMenu}>
          Logout
        </Link>
        <Button />
      </nav>
    </>)
  } 
}

export default Navbar;