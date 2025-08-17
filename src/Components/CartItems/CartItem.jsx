import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeItemCompletely,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
    isLoggedIn,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      // Redirect to login with the checkout as the intended destination
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              {/* <p>product Id: {e.id}</p> */}
              <div className="cartItems-format cartItems-format-main">
                <img
                  src={e.image}
                  alt={e.name}
                  className="cartItem-product-icon"
                />
                <p>{e.name}</p>
                <p>$ {e.new_price}</p>
                <div className="cartItem-quantity-controls">
                  <button
                    className="cartItem-quantity-btn decrease"
                    onClick={() => decreaseQuantity(e.id)}
                  >
                    -
                  </button>
                  <span className="cartItem-quantity-display">
                    {cartItems[e.id]}
                  </span>
                  <button
                    className="cartItem-quantity-btn increase"
                    onClick={() => increaseQuantity(e.id)}
                  >
                    +
                  </button>
                </div>
                <p>$ {e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartItem-remove-icon"
                  src={remove_icon}
                  alt="remove"
                  onClick={() => {
                    removeItemCompletely(e.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartItems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout} className="checkout-btn">
            {isLoggedIn ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
          </button>
        </div>
        <div className="cartItems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
