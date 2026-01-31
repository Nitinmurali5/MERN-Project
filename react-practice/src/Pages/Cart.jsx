import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, [navigate]);

  function updateCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    window.dispatchEvent(new Event('authChange'));
  }

  function increaseQty(id) {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  }

  function decreaseQty(id) {
    const updatedCart = cart
      .map(item =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    updateCart(updatedCart);
  }

  function removeItem(id) {
    const updatedCart = cart.filter(item => item._id !== id);
    updateCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Your cart is empty</h2>
        <button 
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={page}>
      <h1 style={title}>Your Cart</h1>

      {cart.map(item => (
        <div key={item._id} style={card}>
          <img src={item.image} alt={item.title} style={image} />

          <div style={details}>
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>

            <div style={qty}>
              <button onClick={() => decreaseQty(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item._id)}>+</button>
            </div>

            <button style={removeBtn} onClick={() => removeItem(item._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 style={totalStyle}>Total: ₹{total}</h2>
      <button
  style={{
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  }}
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

    </div>
    
  );
};

const page = {
  padding: "30px",
  maxWidth: "800px",
  margin: "auto"
};

const title = {
  textAlign: "center",
  marginBottom: "30px"
};

const card = {
  display: "flex",
  gap: "20px",
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const image = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "6px"
};

const details = {
  flex: 1
};

const qty = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px"
};

const removeBtn = {
  marginTop: "10px",
  background: "crimson",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px"
};

const totalStyle = {
  textAlign: "right",
  marginTop: "30px"
};

export default Cart;
