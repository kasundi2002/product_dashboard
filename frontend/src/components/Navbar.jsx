import React, { useState } from 'react';
import './../styles/Navbar.css';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='Navbar'>
      <nav>
        <Link to='/' className='title'>Shopiii</Link>
        {/* Hamburger menu */}
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Navigation links */}
        <ul className={menuOpen ? 'open' : ''}>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
          <li>
            <NavLink to="/home">Products</NavLink>
          </li>
          <li>
            <NavLink to="/manage">Manage Products</NavLink>
          </li>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
