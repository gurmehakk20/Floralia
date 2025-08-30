import React, { useState, useEffect } from "react";

const UpdatePaymentMethods = ({ user, onUpdatePaymentMethods, navigate }) => {
  const [paymentMethods, setPaymentMethods] = useState(user?.paymentMethods || []);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "Credit Card",
    last4: "",
    expiry: "",
  });

  useEffect(() => {
    setPaymentMethods(user?.paymentMethods || []);
  }, [user]);

  const handlePaymentMethodChange = (e, index, field) => {
    const updatedPaymentMethods = [...paymentMethods];
    updatedPaymentMethods[index] = { ...updatedPaymentMethods[index], [field]: e.target.value };
    setPaymentMethods(updatedPaymentMethods);
  };

  const handleNewPaymentMethodChange = (e) => {
    setNewPaymentMethod({ ...newPaymentMethod, [e.target.name]: e.target.value });
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    if (newPaymentMethod.type && newPaymentMethod.last4 && newPaymentMethod.expiry) {
      onUpdatePaymentMethods([...paymentMethods, newPaymentMethod]);
      setNewPaymentMethod({
        type: "Credit Card",
        last4: "",
        expiry: "",
      });
    } else {
      alert("Please fill in all fields for the new payment method.");
    }
  };

  const handleUpdatePaymentMethods = (e) => {
    e.preventDefault();
    onUpdatePaymentMethods(paymentMethods);
    navigate('/profile'); // Navigate back to profile after update
  };

  const handleDeletePaymentMethod = (index) => {
    const updatedPaymentMethods = paymentMethods.filter((_, i) => i !== index);
    onUpdatePaymentMethods(updatedPaymentMethods);
  };

  return (
    <div className="update-payment-methods-container">
      <h2>Your Payment Methods</h2>
      {paymentMethods.length > 0 ? (
        paymentMethods.map((pm, index) => (
          <div key={index} className="payment-method-item form-group">
            <label>Type</label>
            <input
              type="text"
              value={pm.type}
              onChange={(e) => handlePaymentMethodChange(e, index, "type")}
            />
            <label>Last 4 Digits</label>
            <input
              type="text"
              value={pm.last4}
              onChange={(e) => handlePaymentMethodChange(e, index, "last4")}
              maxLength="4"
            />
            <label>Expiry Date</label>
            <input
              type="text"
              value={pm.expiry}
              onChange={(e) => handlePaymentMethodChange(e, index, "expiry")}
              placeholder="MM/YY"
            />
            <button type="button" onClick={() => handleDeletePaymentMethod(index)} className="btn delete-btn">Delete</button>
          </div>
        ))
      ) : (
        <p>No payment methods saved.</p>
      )}
      <button onClick={handleUpdatePaymentMethods} className="btn">Save Payment Methods</button>

      <h3>Add New Payment Method</h3>
      <form onSubmit={handleAddPaymentMethod} className="profile-form">
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={newPaymentMethod.type} onChange={handleNewPaymentMethodChange}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <div className="form-group">
          <label>Last 4 Digits</label>
          <input
            type="text"
            name="last4"
            value={newPaymentMethod.last4}
            onChange={handleNewPaymentMethodChange}
            maxLength="4"
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            name="expiry"
            value={newPaymentMethod.expiry}
            onChange={handleNewPaymentMethodChange}
            placeholder="MM/YY"
          />
        </div>
        <button type="submit" className="btn">Add Payment Method</button>
      </form>
    </div>
  );
};

export default UpdatePaymentMethods;
