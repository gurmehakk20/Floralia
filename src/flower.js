import React from 'react';
import './flower.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Icon from './Components/Icon/Icon';
import Products from './Components/Products/Products';
import Review from './Components/Review/Review'
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

function FlowerWebsite() {
  return (
    <div>
      <Header/>

      <Home/>

      <About/>
      
      <Icon/>

      <Products/>
      
      <Review/>

      <Contact/>

      <Footer/>
    </div>
  );
}

export default FlowerWebsite;
