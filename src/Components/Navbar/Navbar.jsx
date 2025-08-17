import React from "react";
import "./navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { getTotalCartItems, isLoggedIn, user, logout } =
    useContext(ShopContext);

  const handleLogout = () => {
    logout();
    setMenu(false);
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>SHOPPER</p>
        </Link>{" "}
      </div>
      <ul className="nav-menu">
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
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <div className="nav-user-section">
            <div className="user-avatar">
              <span className="avatar-text">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
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
    </div>
  );
};

export default Navbar;
