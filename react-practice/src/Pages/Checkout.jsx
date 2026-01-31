import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import API from "../services/api";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [onlineMethod, setOnlineMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [cardError, setCardError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length === 0) {
      navigate("/products");
      return;
    }

    
    setCart(() => storedCart);
  }, [navigate]);

  function validateCard(number) {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return "Card number must be 16 digits";
    }
    
    
    let sum = 0;
    for (let i = 0; i < cleaned.length; i++) {
      let digit = parseInt(cleaned[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    return sum % 10 === 0 ? "" : "Invalid card number";
  }

  function handleCardNumber(value) {
    const formatted = value.replace(/\D/g, '').slice(0, 16);
    setCardDetails({...cardDetails, number: formatted});
    setCardError(formatted.length === 16 ? validateCard(formatted) : "");
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    const orderData = {
      user:
        localStorage.getItem("username") ||
        localStorage.getItem("userEmail"),
      items: cart.map(item => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      address,
      paymentMethod: payment,
      totalAmount: total
    };

    console.log("Order data:", orderData);

    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      console.log("Order response:", data);

      if (res.ok) {
        localStorage.removeItem("cart");
        alert(data.msg);
        navigate("/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order");
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <textarea
          className="checkout-textarea"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="checkout-section">
        <h3>Payment Method</h3>

        <label className="payment-option">
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Cash on Delivery
        </label>

        <label className="payment-option">
          <input
            type="radio"
            checked={payment === "online"}
            onChange={() => setPayment("online")}
          />
          Online Payment
        </label>

        {payment === "online" && (
          <div className="online-payment">
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  checked={onlineMethod === "card"}
                  onChange={() => setOnlineMethod("card")}
                />
                Credit/Debit Card
              </label>
              
              <label className="payment-option">
                <input
                  type="radio"
                  checked={onlineMethod === "upi"}
                  onChange={() => setOnlineMethod("upi")}
                />
                UPI Payment
              </label>
            </div>

            {onlineMethod === "card" && (
              <div className="card-form">
                <input
                  className={`card-input ${cardError ? 'error' : ''}`}
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => handleCardNumber(e.target.value)}
                  maxLength={16}
                />
                {cardError && <span className="error-msg">{cardError}</span>}
                <input
                  className="card-input"
                  placeholder="Cardholder Name"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                />
                <div className="card-row">
                  <input
                    className="card-input"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    maxLength={5}
                  />
                  <input
                    className="card-input"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    maxLength={3}
                  />
                </div>
              </div>
            )}

            {onlineMethod === "upi" && (
              <div className="upi-section">
                <h4>Scan QR Code to Pay</h4>
                <div className="qr-code">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourname@paytm&pn=YourName&am=${total}&cu=INR`}
                    alt="UPI Payment QR Code"
                    style={{width: "200px", height: "200px", border: "2px solid #ddd", borderRadius: "8px"}}
                  />
                  <p>Pay ₹{total} via UPI</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="checkout-section order-summary">
        <h3>Order Summary</h3>

        {cart.map(item => (
          <div className="order-item" key={item._id}>
            <span>{item.title} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="order-total">
          Total: ₹{total}
        </div>
      </div>

      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;