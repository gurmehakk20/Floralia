import React from 'react';
import '../Styles/Cart.css'; // We'll create this CSS file next

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <section className="cart" id="cart">
      <h1 className="heading">Your <span>Cart</span></h1>
      <div className="box-container">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="box" key={index}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="content">
                <h3>{item.name}</h3>
                <div className="price">
                  ${item.price}
                </div>
                <div className="quantity">
                  Quantity: {item.quantity}
                </div>
                <button onClick={() => onRemoveFromCart(item.name)} className="btn">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${calculateTotal()}</h3>
          <button className="btn">Checkout</button>
        </div>
      )}
    </section>
  );
};

export default Cart;
