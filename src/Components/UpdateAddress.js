import React, { useState, useEffect } from "react";

const UpdateAddress = ({ user, onUpdateAddresses, navigate }) => {
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user]);

  const handleAddressChange = (e, index, field) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: e.target.value };
    setAddresses(updatedAddresses);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddress.street && newAddress.city && newAddress.zip) {
      onUpdateAddresses([...addresses, newAddress]);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    } else {
      alert("Please fill in all fields for the new address.");
    }
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    onUpdateAddresses(addresses);
    navigate('/profile'); // Navigate back to profile after update
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    onUpdateAddresses(updatedAddresses);
  };

  return (
    <div className="update-addresses-container">
      {addresses.length > 0 ? (
        <div className="existing-addresses-section">
          <h2>Your Saved Addresses</h2>
          {addresses.map((address, index) => (
            <div key={index} className="address-item">
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => handleAddressChange(e, index, "street")}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange(e, index, "city")}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => handleAddressChange(e, index, "state")}
                />
              </div>
              <div className="form-group">
                <label>Zip</label>
                <input
                  type="text"
                  value={address.zip}
                  onChange={(e) => handleAddressChange(e, index, "zip")}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) => handleAddressChange(e, index, "country")}
                />
              </div>
              <button type="button" onClick={() => handleDeleteAddress(index)} className="btn delete-btn">Delete</button>
            </div>
          ))}
          <button onClick={handleUpdateAddress} className="btn">Save All Addresses</button>
        </div>
      ) : (
        <p>No addresses saved. Add one below!</p>
      )}

      <h3>Add New Address</h3>
      <form onSubmit={handleAddAddress} className="profile-form">
        <div className="form-group">
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={newAddress.street}
            onChange={handleNewAddressChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleNewAddressChange}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleNewAddressChange}
          />
        </div>
        <div className="form-group">
          <label>Zip</label>
          <input
            type="text"
            name="zip"
            value={newAddress.zip}
            onChange={handleNewAddressChange}
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={newAddress.country}
            onChange={handleNewAddressChange}
          />
        </div>
        <button type="submit" className="btn">Add Address</button>
      </form>
    </div>
  );
};

export default UpdateAddress;
