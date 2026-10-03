import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Components/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import '../Styles/Checkout.css';
import { formatPrice } from "../Components/formatPrice";

const NEW_ADDRESS = "new";
const EMPTY_ADDRESS = { street: "", city: "", state: "", pincode: "", country: "India" };

const clean = (value) => (value == null ? "" : String(value)).trim();

// Profile address first, then saved addresses — normalised to checkout's shape and de-duplicated.
const getSavedAddresses = (user) => {
  const seen = new Set();
  return [
    { ...user?.address, source: "Profile address" },
    ...(user?.addresses || []).map((a) => ({ ...a, source: "Saved address" })),
  ]
    .filter((a) => clean(a.street) && clean(a.city))
    .map((a) => ({
      source: a.source,
      street: clean(a.street),
      city: clean(a.city),
      state: clean(a.state),
      pincode: clean(a.zip || a.pincode),
      country: clean(a.country),
    }))
    .filter((a) => {
      const key = `${a.street}|${a.city}|${a.pincode}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const formatAddress = (a) => [a.street, a.city, a.state, a.pincode, a.country].filter(Boolean).join(", ");

const isContactComplete = (c) => Boolean(clean(c.name) && clean(c.email) && clean(c.phone));
const isAddressComplete = (a) => Boolean(a && clean(a.street) && clean(a.city) && clean(a.pincode));

const Checkout = ({ user, cartItems = [], onOrderPlaced }) => {
  const navigate = useNavigate();
  const savedAddresses = useMemo(() => getSavedAddresses(user), [user]);

  // Contact details come from the profile; the form only opens when something is missing.
  const [customer, setCustomer] = useState(() => ({
    name: clean([user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name),
    email: clean(user?.email),
    phone: clean(user?.phone),
  }));
  const [editingContact, setEditingContact] = useState(() => !isContactComplete(customer));

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses.length > 0 ? 0 : NEW_ADDRESS);
  const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS);
  const deliveryAddress = selectedAddress === NEW_ADDRESS ? newAddress : savedAddresses[selectedAddress];

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Orders are saved against the account, so checkout starts with logging in.
  if (!user) {
    return (
      <section className="checkout">
        <h1 className="heading">Checkout</h1>
        <div className="checkout-card checkout-gate">
          <p>Log in to check out — we&rsquo;ll fill in your contact details and saved addresses for you.</p>
          <Link to="/login" state={{ from: "/checkout" }} className="btn btn-lg">Log in to continue</Link>
          <p className="checkout-gate-alt">
            New to Floralia? <Link to="/signup" state={{ from: "/checkout" }}>Create an account</Link>
          </p>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout">
        <h1 className="heading">Checkout</h1>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">
            Explore Flowers <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    );
  }

  const handlePlaceOrder = async () => {
    setOrderError(null);
    if (!isContactComplete(customer)) {
      setEditingContact(true);
      setOrderError("incomplete");
      return;
    }
    if (!isAddressComplete(deliveryAddress)) {
      setOrderError("incomplete");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "orders"), {
        // Ties the order to the signed-in account so Firestore rules can check ownership.
        userId: auth.currentUser ? auth.currentUser.uid : null,
        customer: { name: clean(customer.name), email: clean(customer.email), phone: clean(customer.phone) },
        address: {
          street: clean(deliveryAddress.street),
          city: clean(deliveryAddress.city),
          state: clean(deliveryAddress.state),
          pincode: clean(deliveryAddress.pincode),
          country: clean(deliveryAddress.country),
        },
        payment,
        cartItems,
        total,
        createdAt: Timestamp.now(),
        status: "pending",
      });
      setLoading(false);
      navigate("/thank-you");
      if (onOrderPlaced) onOrderPlaced();
    } catch (error) {
      console.error("Error placing order:", error);
      // Firestore rejects unauthenticated writes as "permission-denied".
      setOrderError(error.code === "permission-denied" && !auth.currentUser ? "login" : "failed");
      setLoading(false);
    }
  };

  const updateCustomer = (field) => (e) => setCustomer({ ...customer, [field]: e.target.value });
  const updateNewAddress = (field) => (e) => setNewAddress({ ...newAddress, [field]: e.target.value });

  return (
    <section className="checkout">
      <h1 className="heading">Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* 1. Contact */}
          <div className="checkout-card">
            <div className="checkout-card-head">
              <h2><span className="checkout-step-no">01</span> Contact details</h2>
              {!editingContact && (
                <button type="button" className="text-btn" onClick={() => setEditingContact(true)}>Edit</button>
              )}
            </div>

            {editingContact ? (
              <div className="checkout-fields">
                <div className="field field--full">
                  <label htmlFor="checkout-name">Full name</label>
                  <input id="checkout-name" className="input" type="text" autoComplete="name" value={customer.name} onChange={updateCustomer("name")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-email">Email</label>
                  <input id="checkout-email" className="input" type="email" autoComplete="email" value={customer.email} onChange={updateCustomer("email")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-phone">Phone</label>
                  <input id="checkout-phone" className="input" type="tel" autoComplete="tel" value={customer.phone} onChange={updateCustomer("phone")} />
                </div>
              </div>
            ) : (
              <div className="contact-summary">
                <strong>{customer.name}</strong>
                <span>{customer.email}</span>
                <span>{customer.phone}</span>
              </div>
            )}
          </div>

          {/* 2. Delivery */}
          <div className="checkout-card">
            <div className="checkout-card-head">
              <h2><span className="checkout-step-no">02</span> Delivery address</h2>
            </div>

            {/* With no saved addresses there is nothing to choose — show the form directly. */}
            {savedAddresses.length > 0 && (
              <div className="checkout-options" role="radiogroup" aria-label="Delivery address">
                {savedAddresses.map((address, index) => (
                  <label key={formatAddress(address)} className={`checkout-option ${selectedAddress === index ? "is-selected" : ""}`}>
                    <input
                      type="radio"
                      name="delivery-address"
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                    />
                    <span>
                      <span className="checkout-option-title">{address.source}</span>
                      <span className="checkout-option-text">{formatAddress(address)}</span>
                    </span>
                  </label>
                ))}

                <label className={`checkout-option ${selectedAddress === NEW_ADDRESS ? "is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="delivery-address"
                    checked={selectedAddress === NEW_ADDRESS}
                    onChange={() => setSelectedAddress(NEW_ADDRESS)}
                  />
                  <span className="checkout-option-title">Use a new address</span>
                </label>
              </div>
            )}

            {selectedAddress === NEW_ADDRESS && (
              <div className="checkout-fields checkout-new-address">
                <div className="field field--full">
                  <label htmlFor="checkout-street">Street address</label>
                  <input id="checkout-street" className="input" type="text" autoComplete="street-address" value={newAddress.street} onChange={updateNewAddress("street")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-city">City</label>
                  <input id="checkout-city" className="input" type="text" autoComplete="address-level2" value={newAddress.city} onChange={updateNewAddress("city")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-state">State</label>
                  <input id="checkout-state" className="input" type="text" autoComplete="address-level1" value={newAddress.state} onChange={updateNewAddress("state")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-pincode">Pincode</label>
                  <input id="checkout-pincode" className="input" type="text" inputMode="numeric" autoComplete="postal-code" value={newAddress.pincode} onChange={updateNewAddress("pincode")} />
                </div>
                <div className="field">
                  <label htmlFor="checkout-country">Country</label>
                  <input id="checkout-country" className="input" type="text" autoComplete="country-name" value={newAddress.country} onChange={updateNewAddress("country")} />
                </div>
              </div>
            )}
          </div>

          {/* 3. Payment */}
          <div className="checkout-card">
            <div className="checkout-card-head">
              <h2><span className="checkout-step-no">03</span> Payment</h2>
            </div>
            <div className="checkout-options" role="radiogroup" aria-label="Payment method">
              <label className={`checkout-option ${payment === "cod" ? "is-selected" : ""}`}>
                <input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                <span>
                  <span className="checkout-option-title">Cash on Delivery</span>
                  <span className="checkout-option-text">Pay when your flowers arrive</span>
                </span>
              </label>
              <label className="checkout-option is-disabled">
                <input type="radio" name="payment" value="card" disabled />
                <span>
                  <span className="checkout-option-title">Card</span>
                  <span className="checkout-option-text">Coming soon</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <aside className="checkout-card checkout-summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">Order summary</h2>
          <ul className="summary-items">
            {cartItems.map((item) => (
              <li key={item.name}>
                <span className="summary-thumb"><img src={item.image} alt="" /></span>
                <span className="summary-name">
                  {item.name}
                  <span className="summary-qty">Qty {item.quantity}</span>
                </span>
                <span className="summary-price">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button type="button" className="btn btn-lg checkout-confirm" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>

          {orderError && (
            <p className="order-error" role="alert">
              {orderError === "incomplete" && "Please complete your contact details and delivery address."}
              {orderError === "login" && <>Please <Link to="/login" state={{ from: "/checkout" }}>log in</Link> to place your order.</>}
              {orderError === "failed" && "We couldn't place your order. Please try again in a moment."}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
