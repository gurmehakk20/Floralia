import React from "react";
import { useParams } from "react-router-dom";
import productsData from "./productsData.json";
import '../Styles/ProductPage.css';

const ProductPage = ({ onLike, likedProducts, onAddToCart }) => {
  const { id } = useParams(); // id from URL
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  const handleLike = () => onLike(product);
  const handleAddToCart = () => onAddToCart(product);

  return (
    <section className="product-page">
      <div className="image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <div className="buttons">
          <button onClick={handleAddToCart} className="btn">Add to Cart</button>
          <button onClick={handleLike} className="btn like-btn">
            {likedProducts?.includes(product.id) ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
