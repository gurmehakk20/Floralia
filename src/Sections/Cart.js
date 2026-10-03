import { Link, useNavigate } from "react-router-dom";
import '../Styles/Cart.css';
import { formatPrice } from '../Components/formatPrice';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <section className="cart" id="cart">
      <h1 className="heading">
        Your <span>Cart</span>
      </h1>
      <div className="box-container">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn">
              Explore Flowers <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div className="box" key={index}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="content">
                <h3>{item.name}</h3>
                <div className="price">{formatPrice(item.price)}</div>
                
                {/* Quantity Control */}
                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.name, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1} // prevent quantity < 1
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      onUpdateQuantity(item.name, item.quantity + 1)
                    }
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemoveFromCart(item.name)}
                  className="btn remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: {formatPrice(calculateTotal())}</h3>
          <button
            className="btn checkout-btn"
            onClick={() =>
              navigate("/checkout", { state: { cartItems, total: calculateTotal() } })
            }
          >
            Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
