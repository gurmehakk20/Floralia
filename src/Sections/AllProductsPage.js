import React, { useEffect } from 'react';
import '../Styles/Products.css';
import '../Styles/ProductComponent.css';
import productsData from '../Components/productsData.json';
import ProductComponent from '../Components/ProductComponent';
import '../Styles/AllProductsPage.css';

const AllProductsPage = ({ onLike, likedProducts, onAddToCart }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLike = (product) => {
    onLike(product);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleShare = async (product) => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `Buy ${product.name} for your loved ones for just $${product.price} — only at Floralia!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } catch (error) {
        console.error('Error sharing product:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${productUrl}`);
        alert('Product link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Could not copy product link.');
      }
    }
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <h1 className="heading">Our <span>Products</span></h1>
        <p>Discover our beautiful collection of plants and flowers</p>
      </section>
      
      <section className="products-container">
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

export default AllProductsPage;
