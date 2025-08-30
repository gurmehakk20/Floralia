import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import Review from './Review';
import Contact from './Contact';
import Icon from './Icon';
import Footer from './Footer';

const MainContent = ({ onLike, likedProducts, onAddToCart }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Home />
      <About />
      <Products onLike={onLike} likedProducts={likedProducts} onAddToCart={onAddToCart} />
      <Review />
      <Contact />
      <Icon />
      <Footer />
    </>
  );
};

export default MainContent;
