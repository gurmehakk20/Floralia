import React, { useState } from "react";
import "../Styles/Profile.css";
import UpdateProfile from "../Components/UpdateProfile";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, onLogout, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();
  

  if (!user) {
    return (
      <section className="profile" id="profile">
        <h1 className="heading"><span>Profile</span></h1>
        <p>Please log in to view your profile.</p>
      </section>
    );
  }

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  return (
    <section className="profile" id="profile">
      <h1 className="heading"><span>{user.firstName}'s </span> Profile</h1>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === "info" ? "active" : ""} 
          onClick={() => setActiveTab("info")}
        >Profile Info</button>
        <button 
          className={activeTab === "addresses" ? "active" : ""} 
          onClick={() => setActiveTab("addresses")}
        >Addresses</button>
        <button 
          className={activeTab === "payments" ? "active" : ""} 
          onClick={() => setActiveTab("payments")}
        >Payment Methods</button>
        <button 
          className={activeTab === "preferences" ? "active" : ""} 
          onClick={() => setActiveTab("preferences")}
        >Preferences</button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "info" && (
          <div className="profile-info-display">
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <h3>Address:</h3>
            <p>{user.address?.street}</p>
            <p>{user.address?.city}, {user.address?.state} {user.address?.zip}</p>
            <p>{user.address?.country}</p>
            <button onClick={handleEditProfileClick} className="btn">Update Profile</button>
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="profile-info-display">
            <h2>Saved Addresses</h2>
            {user.addresses?.length > 0 ? (
              <ul>
                {user.addresses.map((addr, i) => (
                  <li key={i}>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</li>
                ))}
              </ul>
            ) : <p>No addresses saved.</p>}
            <button onClick={() => navigate("/profile/addresses")} className="btn">Edit Addresses</button>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="profile-info-display">
            <h2>Payment Methods</h2>
            {user.paymentMethods?.length > 0 ? (
              <ul>
                {user.paymentMethods.map((pm, i) => (
                  <li key={i}>{pm.type}: **** {pm.last4} (Expires: {pm.expiry})</li>
                ))}
              </ul>
            ) : <p>No payment methods added.</p>}
            <button onClick={() => navigate("/profile/payments")} className="btn">Edit Payment Methods</button>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="profile-info-display">
            <h2>Preferences</h2>
            <p>Email Notifications: {user.preferences?.emailNotifications ? "ON" : "OFF"}</p>
            <p>Promotional Emails: {user.preferences?.promotionalEmails ? "ON" : "OFF"}</p>
            <button onClick={() => navigate("/profile/preferences")} className="btn">Edit Preferences</button>
          </div>
        )}
      </div>

      <button onClick={onLogout} className="btn logout">Logout</button>
    </section>
  );
};

export default Profile;
