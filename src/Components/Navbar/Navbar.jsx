import React from "react";
import "./navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
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
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
