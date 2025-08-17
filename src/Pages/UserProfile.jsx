import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, login, logout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "United States",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update user data in context
      const updatedUser = {
        ...user,
        ...formData,
        lastUpdated: new Date().toISOString(),
      };

      login(updatedUser);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ general: "Failed to update profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "United States",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="profile-unauthorized">
        <h2>Access Denied</h2>
        <p>Please log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="login-redirect-btn"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-initials">
              {getInitials(user.name || "User")}
            </span>
          </div>
          <div className="profile-info">
            <h1>{user.name || "User"}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-member-since">
              Member since{" "}
              {formatDate(user.createdAt || new Date().toISOString())}
            </p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-profile-btn"
              >
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  onClick={handleCancel}
                  className="cancel-btn"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <form onSubmit={handleSave} className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <span className="error-text">{errors.name}</span>
                    )}
                  </>
                ) : (
                  <p className="form-value">
                    {formData.name || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </>
                ) : (
                  <p className="form-value">
                    {formData.email || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </>
                ) : (
                  <p className="form-value">
                    {formData.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="form-value">
                    {formatDate(formData.dateOfBirth)}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                {isEditing ? (
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="form-value">
                    {formData.gender
                      ? formData.gender.charAt(0).toUpperCase() +
                        formData.gender.slice(1).replace("-", " ")
                      : "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Address Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="address">Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p className="form-value">
                    {formData.address || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                ) : (
                  <p className="form-value">
                    {formData.city || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                ) : (
                  <p className="form-value">
                    {formData.state || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                      className={errors.zipCode ? "error" : ""}
                    />
                    {errors.zipCode && (
                      <span className="error-text">{errors.zipCode}</span>
                    )}
                  </>
                ) : (
                  <p className="form-value">
                    {formData.zipCode || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                {isEditing ? (
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="form-value">{formData.country}</p>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="profile-footer">
          <div className="danger-zone">
            <h3>Account Actions</h3>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
