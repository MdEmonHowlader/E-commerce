import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const {
    removeItemCompletely,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
    getCartItemsWithSizes,
    clearCart,
    isLoggedIn,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [showClearSuccess, setShowClearSuccess] = useState(false);

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      // Redirect to login with the checkout as the intended destination
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };

  const handleClearCart = () => {
    if (cartItemsWithSizes.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to clear all ${cartItemsWithSizes.length} items from your cart? This action cannot be undone.`
    );

    if (confirmed) {
      clearCart();
      setShowClearSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowClearSuccess(false), 3000);
    }
  };

  const cartItemsWithSizes = getCartItemsWithSizes();

  return (
    <div className="cartItems">
      <div className="cartItems-header">
        <h1>Shopping Cart ({cartItemsWithSizes.length} items)</h1>
        {cartItemsWithSizes.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
            title="Clear all items from cart"
          >
            🗑️ Clear All ({cartItemsWithSizes.length})
          </button>
        )}
      </div>
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      {showClearSuccess && (
        <div className="clear-success-message">
          ✅ Cart cleared successfully!
        </div>
      )}
      <hr />
      {cartItemsWithSizes.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        cartItemsWithSizes.map((item) => (
          <div key={item.cartKey}>
            <div className="cartItems-format cartItems-format-main">
              <img
                src={item.image}
                alt={item.name}
                className="cartItem-product-icon"
              />
              <p>{item.name}</p>
              <div className="cartItem-size-display">
                <span className="size-badge">{item.size}</span>
              </div>
              <p>$ {item.new_price}</p>
              <div className="cartItem-quantity-controls">
                <button
                  className="cartItem-quantity-btn decrease"
                  onClick={() => decreaseQuantity(item.id, item.size)}
                >
                  -
                </button>
                <span className="cartItem-quantity-display">
                  {item.quantity}
                </span>
                <button
                  className="cartItem-quantity-btn increase"
                  onClick={() => increaseQuantity(item.id, item.size)}
                >
                  +
                </button>
              </div>
              <p>$ {item.new_price * item.quantity}</p>
              <img
                className="cartItem-remove-icon"
                src={remove_icon}
                alt="remove"
                onClick={() => {
                  removeItemCompletely(item.id, item.size);
                }}
              />
            </div>
            <hr />
          </div>
        ))
      )}
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
          <button
            onClick={handleProceedToCheckout}
            className="checkout-btn"
            disabled={cartItemsWithSizes.length === 0}
          >
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
