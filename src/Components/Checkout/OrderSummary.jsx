import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ cartItems, cartQuantities, total }) => {
  const shippingFee = 0; // Free shipping
  const tax = Math.round(total * 0.08 * 100) / 100; // 8% tax
  const finalTotal = total + shippingFee + tax;

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-price">${item.new_price}</p>
              <p className="item-quantity">Qty: {cartQuantities[item.id]}</p>
            </div>
            <div className="item-total">
              ${(item.new_price * cartQuantities[item.id]).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>Shipping:</span>
          <span>
            {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>

        <div className="total-row">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="total-row final-total">
          <span>Total:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="secure-checkout">
        <div className="security-icons">🔒 Secure Checkout</div>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
};

export default OrderSummary;
