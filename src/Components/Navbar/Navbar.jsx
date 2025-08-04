import React from "react";
import "./navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
         <Link style={{textDecoration: 'none'}}>Shop</Link>   {menu ==="shop"?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link style={{textDecoration: 'none'}}>Men</Link> {menu === "men" ? <hr />:<></>}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link style={{textDecoration: 'none'}}>Women</Link> {menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{textDecoration: 'none'}}>Kids</Link> {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_icon} alt="" />
        <div className="nav_cart_count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
