import React from 'react';
import '../Styles/Liked.css'; // We'll create this CSS file next

const Liked = ({ likedProducts }) => {
  return (
    <section className="liked" id="liked">
      <h1 className="heading">Your <span>Liked</span> Products</h1>
      <div className="box-container">
        {likedProducts.length === 0 ? (
          <p>No liked products yet.</p>
        ) : (
          likedProducts.map((product, index) => (
            <div className="box" key={index}>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <div className="price">
                  ${product.price}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Liked;
