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
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Your Preferences</h2>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={preferences.emailNotifications}
            onChange={handleChange}
          />
          Email Notifications
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="promotionalEmails"
            checked={preferences.promotionalEmails}
            onChange={handleChange}
          />
          Promotional Emails
        </label>
      </div>
      <button type="submit" className="btn">Update Preferences</button>
    </form>
  );
};

export default UpdatePreferences;
