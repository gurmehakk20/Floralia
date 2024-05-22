import React from 'react';
import './Products.css';
import { FaHeart, FaShare } from 'react-icons/fa';
import productsData from './productsData.json'; 

const Products = () => {
  return (
    <div>
      <section className="products" id="products">
        <h1 className="heading">
          latest <span>products</span>
        </h1>
        <div className="box-container">
          {productsData.map((product, index) => (
            <div className="box" key={index}>
              <span className="discount">-{product.discount}% </span>
              <div className="image">
                <img src={product.image} alt={`product-${index}`} />
                <div className="icons">
                  <a><FaHeart /></a>
                  <button>Add to cart</button>
                  <a><FaShare /></a>
                </div>
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <div className="price">
                  ${product.price} <span>${product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
