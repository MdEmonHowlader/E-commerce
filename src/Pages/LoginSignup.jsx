import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./LoginSignup.css";
const LoginSignUp = () => {
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path (where user was trying to go before login)
  const from = location.state?.from?.pathname || "/";

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

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful authentication
      const userData = {
        id: Date.now(),
        name: formData.name || "User",
        email: formData.email,
      };

      login(userData);

      // Redirect to original destination or home
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ general: "Authentication failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="logInSignUp">
      <div className="logInSignUp-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="logInSignUp-fields">
            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Continue"}
          </button>
        </form>

        <p className="logInSignUp-login">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleMode}>
            {isLogin ? "Sign Up Here" : "Login Here"}
          </span>
        </p>

        {!isLogin && (
          <div className="logInSignUp-agree">
            <input type="checkbox" name="" id="terms" required />
            <label htmlFor="terms">
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
