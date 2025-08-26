import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./Settings.css";

const Settings = () => {
  const { user, updateUser, logout } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Account Settings State
  const [accountData, setAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    bio: user?.bio || "",
  });

  // Address Settings State
  const [addressData, setAddressData] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "United States",
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    theme: localStorage.getItem("theme") || "light",
    language: localStorage.getItem("language") || "english",
    currency: localStorage.getItem("currency") || "USD",
    timezone: localStorage.getItem("timezone") || "UTC-5",
    emailUpdates: localStorage.getItem("emailUpdates") !== "false",
    pushNotifications: localStorage.getItem("pushNotifications") !== "false",
    marketingEmails: localStorage.getItem("marketingEmails") !== "false",
    orderUpdates: localStorage.getItem("orderUpdates") !== "false",
  });

  // Security State
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: localStorage.getItem("twoFactorAuth") === "true",
    loginAlerts: localStorage.getItem("loginAlerts") !== "false",
  });

//  Privacy State
  const [privacyData, setPrivacyData] = useState({
    profileVisibility: localStorage.getItem("profileVisibility") || "private",
    dataSharing: localStorage.getItem("dataSharing") !== "false",
    activityTracking: localStorage.getItem("activityTracking") !== "false",
    personalization: localStorage.getItem("personalization") !== "false",
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleLogout = () => {
    logout();
  };

  const handleAccountSave = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!accountData.name.trim() || !accountData.email.trim()) {
        showMessage("error", "Name and email are required fields");
        setIsLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(accountData.email)) {
        showMessage("error", "Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...accountData };
      updateUser(updatedUser);
      showMessage("success", "Account information updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update account information");
    }
    setIsLoading(false);
  };

  const handleAddressSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, address: addressData };
      updateUser(updatedUser);
      showMessage("success", "Address information updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update address information");
    }
    setIsLoading(false);
  };

  const handlePreferencesSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save to localStorage
      Object.entries(preferences).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      // Apply theme change
      if (preferences.theme === "dark") {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }

      showMessage("success", "Preferences updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update preferences");
    }
    setIsLoading(false);
  };

  const handleSecuritySave = async () => {
    setIsLoading(true);
    try {
      // Password validation
      if (
        securityData.newPassword &&
        securityData.newPassword !== securityData.confirmPassword
      ) {
        showMessage("error", "New passwords do not match");
        setIsLoading(false);
        return;
      }

      if (securityData.newPassword && securityData.newPassword.length < 6) {
        showMessage("error", "Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save security settings to localStorage
      localStorage.setItem("twoFactorAuth", securityData.twoFactorAuth);
      localStorage.setItem("loginAlerts", securityData.loginAlerts);

      // Clear password fields
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      showMessage("success", "Security settings updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update security settings");
    }
    setIsLoading(false);
  };

  const handlePrivacySave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save to localStorage
      Object.entries(privacyData).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      showMessage("success", "Privacy settings updated successfully!");
    } catch (error) {
      showMessage("error", "Failed to update privacy settings");
    }
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      if (
        window.confirm(
          "This will permanently delete all your data. Are you absolutely sure?"
        )
      ) {
        setIsLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Clear all data and logout
          localStorage.clear();
          logout();
          showMessage("success", "Account deleted successfully");
        } catch (error) {
          showMessage("error", "Failed to delete account");
        }
        setIsLoading(false);
      }
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        profile: { ...user, ...accountData, address: addressData },
        preferences,
        exportDate: new Date().toISOString(),
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `user-data-${
        new Date().toISOString().split("T")[0]
      }.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      showMessage("success", "Data exported successfully!");
    } catch (error) {
      showMessage("error", "Failed to export data");
    }
    setIsLoading(false);
  };

  const tabs = [
    { id: "account", name: "Account", icon: "👤" },
    { id: "address", name: "Address", icon: "📍" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "security", name: "Security", icon: "🔒" },
    
  ];

  if (!user) {
    return (
      <div className="settings-unauthorized">
        <h2>Access Denied</h2>
        <p>Please log in to access your settings.</p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="login-redirect-btn"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <div className="header-content">
            <div className="header-text">
              <h1>Settings</h1>
              <p>Manage your account settings and preferences</p>
            </div>
            <div className="header-actions">
              <Link to="/profile" className="user-action-btn profile-btn">
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="user-action-btn logout-btn"
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`settings-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="settings-content">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`settings-nav-item ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-text">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="settings-main">
            {activeTab === "account" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Account Information</h2>
                  <p>Update your personal information</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={accountData.name}
                      onChange={(e) =>
                        setAccountData({ ...accountData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={accountData.email}
                      onChange={(e) =>
                        setAccountData({
                          ...accountData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={accountData.phone}
                      onChange={(e) =>
                        setAccountData({
                          ...accountData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={accountData.dateOfBirth}
                      onChange={(e) =>
                        setAccountData({
                          ...accountData,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={accountData.gender}
                      onChange={(e) =>
                        setAccountData({
                          ...accountData,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>Bio</label>
                    <textarea
                      value={accountData.bio}
                      onChange={(e) =>
                        setAccountData({ ...accountData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="section-actions">
                  <button
                    onClick={handleAccountSave}
                    disabled={isLoading}
                    className="save-btn"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Address Information</h2>
                  <p>Manage your shipping and billing address</p>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          street: e.target.value,
                        })
                      }
                      placeholder="Enter your street address"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={addressData.city}
                      onChange={(e) =>
                        setAddressData({ ...addressData, city: e.target.value })
                      }
                      placeholder="Enter your city"
                    />
                  </div>

                  <div className="form-group">
                    <label>State/Province</label>
                    <input
                      type="text"
                      value={addressData.state}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          state: e.target.value,
                        })
                      }
                      placeholder="Enter your state"
                    />
                  </div>

                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      value={addressData.postalCode}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          postalCode: e.target.value,
                        })
                      }
                      placeholder="Enter postal code"
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <select
                      value={addressData.country}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          country: e.target.value,
                        })
                      }
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="section-actions">
                  <button
                    onClick={handleAddressSave}
                    disabled={isLoading}
                    className="save-btn"
                  >
                    {isLoading ? "Saving..." : "Save Address"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Preferences</h2>
                  <p>Customize your experience</p>
                </div>

                <div className="preferences-grid">
                  <div className="preference-group">
                    <h3>Appearance</h3>
                    <div className="form-group">
                      <label>Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            theme: e.target.value,
                          })
                        }
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>

                  <div className="preference-group">
                    <h3>Language & Region</h3>
                    <div className="form-group">
                      <label>Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            language: e.target.value,
                          })
                        }
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Currency</label>
                      <select
                        value={preferences.currency}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            currency: e.target.value,
                          })
                        }
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            timezone: e.target.value,
                          })
                        }
                      >
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                      </select>
                    </div>
                  </div>

                  <div className="preference-group">
                    <h3>Notifications</h3>
                    <div className="toggle-group">
                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={preferences.emailUpdates}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                emailUpdates: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">Email Updates</span>
                        </label>
                      </div>

                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={preferences.pushNotifications}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                pushNotifications: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">
                            Push Notifications
                          </span>
                        </label>
                      </div>

                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={preferences.marketingEmails}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                marketingEmails: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">Marketing Emails</span>
                        </label>
                      </div>

                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={preferences.orderUpdates}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                orderUpdates: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">Order Updates</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-actions">
                  <button
                    onClick={handlePreferencesSave}
                    disabled={isLoading}
                    className="save-btn"
                  >
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Security Settings</h2>
                  <p>Manage your account security</p>
                </div>

                <div className="security-sections">
                  <div className="security-group">
                    <h3>Change Password</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          value={securityData.currentPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              currentPassword: e.target.value,
                            })
                          }
                          placeholder="Enter current password"
                        />
                      </div>

                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          value={securityData.newPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          value={securityData.confirmPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="security-group">
                    <h3>Security Options</h3>
                    <div className="toggle-group">
                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={securityData.twoFactorAuth}
                            onChange={(e) =>
                              setSecurityData({
                                ...securityData,
                                twoFactorAuth: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">
                            Two-Factor Authentication
                          </span>
                          <span className="toggle-description">
                            Add an extra layer of security to your account
                          </span>
                        </label>
                      </div>

                      <div className="toggle-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={securityData.loginAlerts}
                            onChange={(e) =>
                              setSecurityData({
                                ...securityData,
                                loginAlerts: e.target.checked,
                              })
                            }
                          />
                          <span className="toggle-text">Login Alerts</span>
                          <span className="toggle-description">
                            Get notified when someone logs into your account
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-actions">
                  <button
                    onClick={handleSecuritySave}
                    disabled={isLoading}
                    className="save-btn"
                  >
                    {isLoading ? "Saving..." : "Update Security"}
                  </button>
                </div>
              </div>
            )}

           

            {/* {activeTab === "data" && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Data Management</h2>
                  <p>Export or delete your data</p>
                </div>

                <div className="data-sections">
                  <div className="data-group">
                    <h3>Export Your Data</h3>
                    <p>
                      Download a copy of all your data including profile
                      information, order history, and preferences.
                    </p>
                    <button
                      onClick={handleExportData}
                      disabled={isLoading}
                      className="export-btn"
                    >
                      {isLoading ? "Preparing Export..." : "Export Data"}
                    </button>
                  </div>

                  <div className="data-group danger-zone">
                    <h3>Danger Zone</h3>
                    <p>
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isLoading}
                      className="delete-btn"
                    >
                      {isLoading ? "Deleting..." : "Delete Account"}
                    </button>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
