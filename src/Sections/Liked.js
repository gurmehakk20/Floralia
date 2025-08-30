import React from 'react';
import '../Styles/Liked.css';
import ProductComponent from '../Components/ProductComponent'; // Import ProductComponent

const Liked = ({ likedProducts, onAddToCart }) => {
  return (
    <section className="liked" id="liked">
      <h1 className="heading">Your <span>Liked</span> Products</h1>
      <div className="box-container">
        {likedProducts.length === 0 ? (
          <p>No liked products yet.</p>
        ) : (
          likedProducts.map((product, index) => (
            <ProductComponent 
              key={index} 
              product={product} 
              onAddToCart={onAddToCart} 
              // onLike is not passed here as it's a liked page
              onShare={() => { /* Implement share logic if needed on liked page */ }} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Liked;
