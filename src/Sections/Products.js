import React from 'react';
import '../Styles/Products.css';
import '../Styles/ProductComponent.css'; // Import the new CSS file
// import { FaHeart, FaShare } from 'react-icons/fa';
import productsData from '../Components/productsData.json'; 
import ProductComponent from '../Components/ProductComponent';

const Products = ({ onLike, likedProducts, onAddToCart }) => {

  const handleLike = (product) => {
    onLike(product);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleShare = async (product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href, // You might want a more specific product URL here
        });
        console.log('Product shared successfully');
      } catch (error) {
        console.error('Error sharing product:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      try {
        await navigator.clipboard.writeText(`${window.location.href}#products`); // Fallback: copy link to clipboard
        alert('Product link copied to clipboard!');
        console.log('Product link copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Could not copy product link.');
      }
    }
  };

  return (
    <div>
      <section className="products" id="products">
        <h1 className="heading">
          latest <span>products</span>
        </h1>
        <div className="box-container">
          {productsData.map((product, index) => (
            <ProductComponent 
              key={index} 
              product={product} 
              onLike={handleLike} 
              onAddToCart={handleAddToCart} 
              onShare={handleShare} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
