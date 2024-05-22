import React from 'react'
import './Header.css'
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div>
        <header>
        
        <a href="#" className="logo">floralia <span>.</span></a>
        <nav className="navbar">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#products">PRODUCTS</a>
          <a href="#review">REVIEW</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="icons">
          <a><FaHeart /></a>
          <a><FaCartShopping /></a>
          <a><FaUser /></a>
        </div>
      </header>
      
    </div>
  )
}

export default Header
