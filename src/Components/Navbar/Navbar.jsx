import React from "react";
import "./navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartItems, isLoggedIn, user, logout } =
    useContext(ShopContext);

  const handleLogout = () => {
    logout();
    setMenu(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>SHOPPER</p>
        </Link>{" "}
      </div>

      {/* Desktop Navigation Menu */}
      <ul className="nav-menu desktop-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>{" "}
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>{" "}
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span
          className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
        ></span>
      </button>

      {/* Desktop User/Cart Section */}
      <div className="nav-login-cart desktop-actions">
        {isLoggedIn ? (
          <div className="nav-user-section">
            {/* <div className="user-avatar">
             <span className="avatar-text">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div> */}
            <div className="user-dropdown">
              <span className="user-greeting">Hello, {user?.name}</span>
              <div className="user-actions">
                <Link to="/settings" className="user-action-btn settings-btn">
                  <svg
                    className="action-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m10.5-2.5l5.7-5.7m-11.4 0l5.7 5.7m0-11.4l5.7 5.7m-11.4 0l5.7 5.7" />
                  </svg>
                  Settings
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-btn">
              <svg
                className="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10,17 15,12 10,7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </button>
          </Link>
        )}
        <Link to="/cart" className="cart-link">
          <div
            className={`cart-container ${
              getTotalCartItems() > 0 ? "has-items" : ""
            }`}
          >
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {getTotalCartItems() > 0 && (
              <div className="cart-count-badge">
                <span className="cart-count-text">{getTotalCartItems()}</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <ul className="mobile-nav-links">
          <li
            onClick={() => {
              setMenu("shop");
              closeMobileMenu();
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <svg
                className="mobile-nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Shop
            </Link>
          </li>
          <li
            onClick={() => {
              setMenu("men");
              closeMobileMenu();
            }}
          >
            <Link to="/mens" style={{ textDecoration: "none" }}>
              <svg
                className="mobile-nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Men
            </Link>
          </li>
          <li
            onClick={() => {
              setMenu("women");
              closeMobileMenu();
            }}
          >
            <Link to="/womens" style={{ textDecoration: "none" }}>
              <svg
                className="mobile-nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                <path d="M16 3.13a4 4 0 010 7.75" />
                <path d="M21 21v-2a4 4 0 00-3-3.85" />
              </svg>
              Women
            </Link>
          </li>
          <li
            onClick={() => {
              setMenu("kids");
              closeMobileMenu();
            }}
          >
            <Link to="/kids" style={{ textDecoration: "none" }}>
              <svg
                className="mobile-nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 19c-5 0-5-3-5-3s0-3 5-3 5 3 5 3-0 3-5 3" />
                <path d="M9 7a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M15 19c-5 0-5-3-5-3s0-3 5-3 5 3 5 3-0 3-5 3" />
                <path d="M15 7a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Kids
            </Link>
          </li>
        </ul>

        <div className="mobile-user-actions">
          {isLoggedIn ? (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="user-avatar mobile-avatar">
                  <span className="avatar-text">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="mobile-user-name">Hello, {user?.name}</span>
              </div>
              <div className="mobile-actions-list">
                <Link
                  to="/settings"
                  className="mobile-action-btn"
                  onClick={closeMobileMenu}
                >
                  <svg
                    className="mobile-action-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                  Settings
                </Link>
                <button
                  className="mobile-action-btn logout-mobile"
                  onClick={handleLogout}
                >
                  <svg
                    className="mobile-action-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="mobile-login-btn"
              onClick={closeMobileMenu}
            >
              <svg
                className="mobile-action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                <polyline points="10,17 15,12 10,7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="mobile-cart-btn"
            onClick={closeMobileMenu}
          >
            <div className="mobile-cart-container">
              <svg
                className="mobile-cart-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <span>Cart</span>
              {getTotalCartItems() > 0 && (
                <div className="mobile-cart-badge">
                  <span>{getTotalCartItems()}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </div>
  );
};

export default Navbar;
