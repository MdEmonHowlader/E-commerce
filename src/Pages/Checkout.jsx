import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../Components/Checkout/CheckoutForm";
import OrderSummary from "../Components/Checkout/OrderSummary";
import PaymentSection from "../Components/Checkout/PaymentSection";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, getTotalCartAmount, all_product, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Check if cart is empty
  const cartIsEmpty =
    Object.keys(cartItems).length === 0 ||
    Object.values(cartItems).every((quantity) => quantity === 0);

  if (cartIsEmpty) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate("/")} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCustomerInfoSubmit = (info) => {
    setCustomerInfo(info);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (payment) => {
    setPaymentInfo(payment);
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setCurrentStep(4);
    }, 2000);
  };

  const getCartItems = () => {
    return all_product.filter((product) => cartItems[product.id] > 0);
  };

  if (orderPlaced && currentStep === 4) {
    return (
      <div className="checkout-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <div className="order-details">
            <h3>Order Summary</h3>
            <p>
              <strong>Order Total:</strong> ${getTotalCartAmount()}
            </p>
            <p>
              <strong>Customer:</strong> {customerInfo.firstName}{" "}
              {customerInfo.lastName}
            </p>
            <p>
              <strong>Email:</strong> {customerInfo.email}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <span>1</span> Customer Info
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <span>2</span> Payment
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <span>3</span> Review
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {currentStep === 1 && (
            <CheckoutForm
              onSubmit={handleCustomerInfoSubmit}
              initialData={customerInfo}
            />
          )}

          {currentStep === 2 && (
            <PaymentSection
              onSubmit={handlePaymentSubmit}
              onBack={() => setCurrentStep(1)}
              customerInfo={customerInfo}
            />
          )}

          {currentStep === 3 && (
            <div className="order-review">
              <h2>Review Your Order</h2>
              <div className="review-sections">
                <div className="review-customer">
                  <h3>Shipping Information</h3>
                  <p>
                    {customerInfo.firstName} {customerInfo.lastName}
                  </p>
                  <p>{customerInfo.address}</p>
                  <p>
                    {customerInfo.city}, {customerInfo.state}{" "}
                    {customerInfo.zipCode}
                  </p>
                  <p>{customerInfo.country}</p>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>

                <div className="review-payment">
                  <h3>Payment Information</h3>
                  <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                  <p>{paymentInfo.cardholderName}</p>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="review-actions">
                <button onClick={() => setCurrentStep(2)} className="back-btn">
                  Back to Payment
                </button>
                <button onClick={handlePlaceOrder} className="place-order-btn">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-sidebar">
          <OrderSummary
            cartItems={getCartItems()}
            cartQuantities={cartItems}
            total={getTotalCartAmount()}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
