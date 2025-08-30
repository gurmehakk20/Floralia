import React, { useState } from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';

const ProductComponent = ({ product, onLike, onAddToCart, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedAnimating, setIsLikedAnimating] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [likeMsg, setLikeMsg] = useState("");
  const [cartMsg, setCartMsg] = useState("");

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setIsLikedAnimating(true);

    onLike(product, newLikedState);

    setLikeMsg(newLikedState ? "Added to wishlist 💖" : "Removed from wishlist ❌");

    setTimeout(() => {
      setIsLikedAnimating(false);
      setLikeMsg("");
    }, 1500);
  };

  const handleAddToCartClick = () => {
    setIsCartAnimating(true);
    onAddToCart(product);
    setCartMsg("Added to cart ✅");

    setTimeout(() => {
      setIsCartAnimating(false);
      setCartMsg("");
    }, 1500);
  };

  return (
    <div className="product-card">
      <span className="discount">-{product.discount}%</span>

      <div className="image">
        <img src={product.image} alt={product.name} />

        {/* ❤️ Top corner indicator */}
        {isLiked && (
          <span className="liked-indicator">
            <FaHeart />
          </span>
        )}
      </div>

      <div className="icons">
        {/* Floating action messages */}
        {likeMsg && <span className="like-msg">{likeMsg}</span>}
        {cartMsg && <span className="cart-msg">{cartMsg}</span>}

        {/* Like button */}
        <button
          onClick={handleLikeClick}
          className={`heart-btn ${isLiked ? 'active' : ''} ${isLikedAnimating ? 'heart-pulse' : ''}`}
        >
          <FaHeart />
        </button>

        {/* Cart button */}
        <button
          onClick={handleAddToCartClick}
          className={`cart-btn ${isCartAnimating ? 'added-to-cart' : ''}`}
        >
          Add to cart
        </button>

        {/* Share button */}
        <button className="share-btn" onClick={() => onShare(product)}>
          <FaShare />
        </button>
      </div>

      <div className="content">
        <h3>{product.name}</h3>
        <div className="price">
          ${product.price} <span>${product.oldPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
