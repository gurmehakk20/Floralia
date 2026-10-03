import React, { useState } from 'react';
import { LuHeart, LuShare2, LuCheck } from 'react-icons/lu';
import { formatPrice } from './formatPrice';

// `liked` is optional: when the parent passes the real wishlist state the heart
// stays in sync across pages; otherwise the card tracks it locally.
const ProductComponent = ({ product, liked, onLike, onAddToCart, onShare }) => {
  const [localLiked, setLocalLiked] = useState(false);
  const [isLikedAnimating, setIsLikedAnimating] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [likeMsg, setLikeMsg] = useState("");
  const [cartMsg, setCartMsg] = useState("");

  const isLiked = typeof liked === 'boolean' ? liked : localLiked;

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setLocalLiked(newLikedState);
    setIsLikedAnimating(true);

    onLike(product, newLikedState);

    setLikeMsg(newLikedState ? "Added to wishlist" : "Removed from wishlist");

    setTimeout(() => {
      setIsLikedAnimating(false);
      setLikeMsg("");
    }, 1500);
  };

  const handleAddToCartClick = () => {
    setIsCartAnimating(true);
    onAddToCart(product);
    setCartMsg("Added to cart");

    setTimeout(() => {
      setIsCartAnimating(false);
      setCartMsg("");
    }, 1500);
  };

  return (
    <article className="product-card">
      <div className="product-media">
        {product.discount > 0 && (
          <span className="product-badge">
            <span className="visually-hidden">Save </span>-{product.discount}%
          </span>
        )}

        <div className="product-actions">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`icon-action heart-btn ${isLiked ? 'active' : ''} ${isLikedAnimating ? 'heart-pulse' : ''}`}
            aria-pressed={isLiked}
            aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <LuHeart aria-hidden="true" />
          </button>
          {onShare && (
            <button
              type="button"
              className="icon-action share-btn"
              onClick={() => onShare(product)}
              aria-label={`Share ${product.name}`}
            >
              <LuShare2 aria-hidden="true" />
            </button>
          )}
        </div>

        <img src={product.image} alt={product.name} loading="lazy" />

        <p className={`product-toast ${likeMsg ? 'is-visible' : ''}`} role="status">{likeMsg}</p>
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description && <p className="product-desc">{product.description}</p>}

        <p className="product-price">
          <span className="price-now">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <s className="price-was">
              <span className="visually-hidden">Original price </span>
              {formatPrice(product.oldPrice)}
            </s>
          )}
        </p>

        <button
          type="button"
          onClick={handleAddToCartClick}
          className={`btn btn-product cart-btn ${isCartAnimating ? 'added-to-cart' : ''}`}
        >
          {isCartAnimating ? (
            <>
              <LuCheck aria-hidden="true" /> Added to Cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
        <span className="visually-hidden" role="status">{cartMsg}</span>
      </div>
    </article>
  );
};

export default ProductComponent;
