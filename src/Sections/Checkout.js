import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../Components/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import '../Styles/Checkout.css';


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

  const [step, setStep] = useState(1);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
  });
  
  // Validation functions
  const isCustomerInfoValid = () => {
    return customer.name.trim() !== "" && 
           customer.email.trim() !== "" && 
           customer.phone.trim() !== "";
  };
  
  const isAddressValid = () => {
    return address.street.trim() !== "" && 
           address.city.trim() !== "" && 
           address.pincode.trim() !== "";
  };

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "orders"), {
        customer,
        address,
        payment,
        cartItems,
        total,
        createdAt: Timestamp.now(),
        status: "pending",
      });
      setLoading(false);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error placing order:", error);
      setLoading(false);
    }
  };

  return (
    <section className="checkout">
      <h1 className="heading">
        Checkout <span>Step {step}</span>
      </h1>

      {/* Step 1: Customer Info */}
      {step === 1 && (
        <div className="checkout-step">
          <input
            type="text"
            placeholder="Full Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            required
          />
          <button 
            className={`btn ${!isCustomerInfoValid() ? 'disabled-btn' : ''}`} 
            onClick={() => isCustomerInfoValid() && setStep(2)}
            disabled={!isCustomerInfoValid()}
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Address Info */}
      {step === 2 && (
        <div className="checkout-step">
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            required
          />
          <div className="buttons">
            <button className="btn" onClick={() => setStep(1)}>
              Back
            </button>
            <button 
              className={`btn ${!isAddressValid() ? 'disabled-btn' : ''}`}
              onClick={() => isAddressValid() && setStep(3)}
              disabled={!isAddressValid()}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment + Review */}
      {step === 3 && (
        <div className="checkout-step">
          <h3>Order Summary</h3>
          {cartItems.map((item, i) => (
            <p key={i}>
              {item.name} x {item.quantity} = ${item.price * item.quantity}
            </p>
          ))}
          <h2>Total: ${total}</h2>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card" disabled>
              Card (Coming Soon)
            </option>
          </select>

          <div className="buttons">
            <button className="btn" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checkout;
