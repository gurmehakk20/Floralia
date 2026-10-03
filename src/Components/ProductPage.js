import React from "react";
import { Link, useParams } from "react-router-dom";
import productsData from "./productsData.json";
import { formatPrice } from "./formatPrice";
import { OCCASIONS } from "../Sections/Occasions";
import '../Styles/ProductPage.css';

const ProductPage = ({ onLike, likedProducts, onAddToCart }) => {
  const { id } = useParams(); // id from URL
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <section className="product-page product-page--empty">
        <div className="empty-state">
          <p>Product not found!</p>
          <Link to="/products" className="btn">Explore Flowers <span className="btn-arrow" aria-hidden="true">→</span></Link>
        </div>
      </section>
    );
  }

  const isLiked = likedProducts?.some((p) => p.name === product.name);
  const occasionLabels = OCCASIONS
    .filter((occasion) => product.occasions?.includes(occasion.slug))
    .map((occasion) => occasion.label);
  const handleLike = () => onLike(product);
  const handleAddToCart = () => onAddToCart(product);

  return (
    <section className="product-page">
      <div className="image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details">
        {occasionLabels.length > 0 && <p className="eyebrow">{occasionLabels.join(' · ')}</p>}
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <p className="price">
          {formatPrice(product.price)}
          {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
        </p>
        <div className="buttons">
          <button onClick={handleAddToCart} className="btn btn-lg">Add to Cart</button>
          <button onClick={handleLike} className="btn btn-lg btn-outline like-btn" aria-pressed={!!isLiked}>
            {isLiked ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
