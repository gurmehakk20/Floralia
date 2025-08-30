import React, { useState } from 'react';
import '../Styles/Header.css';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <Link to="/" className="logo">floralia <span>.</span></Link>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link to={{ pathname: '/', hash: '#about' }} onClick={closeMenu}>ABOUT</Link>
        <Link to="/products" onClick={closeMenu}>PRODUCTS</Link>
        <Link to={{ pathname: '/', hash: '#review' }} onClick={closeMenu}>REVIEW</Link>
        <Link to={{ pathname: '/', hash: '#contact' }} onClick={closeMenu}>CONTACT</Link>
      </nav>

      <div className="icons">
        <Link to="/liked"><FaHeart /></Link>
        <Link to="/cart"><FaCartShopping /></Link>
        {user ? (
          <Link to="/profile"><FaUser /></Link>
        ) : (
          <Link to="/login"><FaUser /></Link>
        )}
        <div id="toggler" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  )
}

export default Header;
