import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import API from "../services/api";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
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

  setCart(storedCart);
}, [navigate]);


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

    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem("cart");
      alert(data.msg);
      navigate("/");
    } else {
      alert(data.msg);
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
