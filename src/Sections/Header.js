import React from 'react'
import '../Styles/Header.css'
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <header>
        
        <a href="#" className="logo">floralia <span>.</span></a>
        <nav className="navbar">
          <a href="#home" className="active">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#products">PRODUCTS</a>
          <a href="#review">REVIEW</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="icons">
          <Link to="/liked"><FaHeart /></Link>
          <Link to="/cart"><FaCartShopping /></Link>
          <a href="#"><FaUser /></a>
        </div>
      </header>
      
    </div>
  )
}

export default Header
