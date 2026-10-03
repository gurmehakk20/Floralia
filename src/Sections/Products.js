import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Products.css';
import '../Styles/ProductComponent.css';
import productsData from '../Components/productsData.json';
import ProductComponent from '../Components/ProductComponent';

// The home page shows a curated selection; the full range lives on /products.
const FEATURED_COUNT = 6;

const Products = ({ onLike, likedProducts = [], onAddToCart }) => {

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
    <section className="products" id="products" aria-labelledby="products-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="products-title" className="section-title">Latest Products</h2>
            <p className="section-sub">Freshly picked favourites</p>
          </div>
          <Link to="/products" className="link-arrow">
            View All Products <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="product-grid">
          {productsData.slice(0, FEATURED_COUNT).map((product) => (
            <ProductComponent
              key={product.id}
              product={product}
              liked={likedProducts.some((item) => item.name === product.name)}
              onLike={handleLike}
              onAddToCart={handleAddToCart}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
