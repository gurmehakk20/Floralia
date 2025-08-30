import React, { useState, useEffect } from "react";

const UpdatePreferences = ({ user, onUpdatePreferences, navigate }) => {
  const [preferences, setPreferences] = useState({
    emailNotifications: user?.preferences?.emailNotifications || false,
    promotionalEmails: user?.preferences?.promotionalEmails || false,
  });

  useEffect(() => {
    setPreferences({
      emailNotifications: user?.preferences?.emailNotifications || false,
      promotionalEmails: user?.preferences?.promotionalEmails || false,
    });
  }, [user]);

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePreferences(preferences);
    navigate('/profile'); // Navigate back to profile after update
  };

  return (
    <div className="update-preferences-container">
      <h2>Your Preferences</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handleChange}
            />
            <span>Email Notifications</span>
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="promotionalEmails"
              checked={preferences.promotionalEmails}
              onChange={handleChange}
            />
            <span>Promotional Emails</span>
          </label>
        </div>
        <button type="submit" className="btn">Update Preferences</button>
      </form>
    </div>
  );
};

export default UpdatePreferences;
