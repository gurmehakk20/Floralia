import React from 'react'
import '../Styles/Header.css'
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = ({ user }) => {

  return (
    <div>
        <header>
        
        <Link to="/" className="logo">floralia <span>.</span></Link>
        <nav className="navbar">
          <Link to={{ pathname: '/', hash: '#home' }}>HOME</Link>
          <Link to={{ pathname: '/', hash: '#about' }}>ABOUT</Link>
          <Link to={{ pathname: '/', hash: '#products' }}>PRODUCTS</Link>
          <Link to={{ pathname: '/', hash: '#review' }}>REVIEW</Link>
          <Link to={{ pathname: '/', hash: '#contact' }}>CONTACT</Link>
        </nav>

        <div className="icons">
          <Link to="/liked"><FaHeart /></Link>
          <Link to="/cart"><FaCartShopping /></Link>
          {user ? (
            <Link to="/profile"><FaUser /></Link>
          ) : (
            <Link to="/login"><FaUser /></Link>
          )}
        </div>
      </header>
      
    </div>
  )
}

export default Header
