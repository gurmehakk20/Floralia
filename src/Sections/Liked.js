import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Liked.css';
import '../Styles/ProductComponent.css';
import ProductComponent from '../Components/ProductComponent'; // Import ProductComponent

const Liked = ({ likedProducts, onAddToCart, onLike }) => {
  return (
    <section className="liked" id="liked">
      <div className="container">
        <h1 className="heading">Your <span>Wishlist</span></h1>
        {likedProducts.length === 0 ? (
          <div className="empty-state">
            <p>No liked products yet. Tap the heart on any bouquet to save it here.</p>
            <Link to="/products" className="btn">
              Explore Flowers <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {likedProducts.map((product) => (
              <ProductComponent
                key={product.name}
                product={product}
                liked
                onAddToCart={onAddToCart}
                onLike={onLike}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Liked;
