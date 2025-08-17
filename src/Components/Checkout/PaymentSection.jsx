import React, { useState } from "react";
import "./PaymentSection.css";

const PaymentSection = ({ onSubmit, onBack, customerInfo }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number
    if (name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (value.length > 19) value = value.substr(0, 19);
    }

    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
    }

    // Format CVV
    if (name === "cvv") {
      value = value.replace(/\D/g, "").substr(0, 4);
    }

    setPaymentData((prev) => ({
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

  const validatePayment = () => {
    const newErrors = {};

    if (!paymentData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
    }

    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePayment()) {
      onSubmit(paymentData);
    }
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard";
    if (num.startsWith("3")) return "American Express";
    return "";
  };

  return (
    <div className="payment-section">
      <h2>Payment Information</h2>

      <div className="customer-summary">
        <h3>Shipping to:</h3>
        <p>
          {customerInfo.firstName} {customerInfo.lastName}
        </p>
        <p>{customerInfo.address}</p>
        <p>
          {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}
        </p>
        <button onClick={onBack} className="edit-address-btn">
          Edit Address
        </button>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number *</label>
          <div className="card-input">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? "error" : ""}
            />
            {getCardType(paymentData.cardNumber) && (
              <span className="card-type">
                {getCardType(paymentData.cardNumber)}
              </span>
            )}
          </div>
          {errors.cardNumber && (
            <span className="error-message">{errors.cardNumber}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className={errors.expiryDate ? "error" : ""}
            />
            {errors.expiryDate && (
              <span className="error-message">{errors.expiryDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              className={errors.cvv ? "error" : ""}
            />
            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder Name *</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={paymentData.cardholderName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={errors.cardholderName ? "error" : ""}
          />
          {errors.cardholderName && (
            <span className="error-message">{errors.cardholderName}</span>
          )}
        </div>

        <div className="accepted-cards">
          <h4>We Accept:</h4>
          <div className="card-icons">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 American Express</span>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onBack} className="back-btn">
            Back to Shipping
          </button>
          <button type="submit" className="continue-btn">
            Review Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSection;
