import React from 'react';
import '../Styles/Profile.css';

const Profile = ({ user, onLogout }) => {
  if (!user) {
    return (
      <section className="profile" id="profile">
        <h1 className="heading"><span>Profile</span></h1>
        <p>Please log in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="profile" id="profile">
      <h1 className="heading"><span>{user.name}'s Profile</span></h1>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        
        <h2>Orders</h2>
        {user.orders && user.orders.length > 0 ? (
          <ul>
            {user.orders.map((order, index) => (
              <li key={index}>Order #{order.id}: {order.date} - ${order.total}</li>
            ))}
          </ul>
        ) : (
          <p>No orders yet.</p>
        )}

        <h2>Addresses</h2>
        {user.addresses && user.addresses.length > 0 ? (
          <ul>
            {user.addresses.map((address, index) => (
              <li key={index}>{address.street}, {address.city}, {address.zip}</li>
            ))}
          </ul>
        ) : (
          <p>No addresses added.</p>
        )}

        <h2>Payment Methods</h2>
        {user.paymentMethods && user.paymentMethods.length > 0 ? (
          <ul>
            {user.paymentMethods.map((method, index) => (
              <li key={index}>{method.type}: **** **** **** {method.last4}</li>
            ))}
          </ul>
        ) : (
          <p>No payment methods added.</p>
        )}

        <button onClick={onLogout} className="btn">Logout</button>
      </div>
    </section>
  );
};

export default Profile;
