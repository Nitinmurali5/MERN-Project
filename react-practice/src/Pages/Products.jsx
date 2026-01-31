import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
         if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
        const data = await res.json();
       setProducts(data.products || []);
      } catch (err) {
         console.error(err);
         setError("Unable to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  function handleAddToCart(product) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={page}>
      <h1 style={title}>Products</h1>

      <div style={grid}>
        {products.length === 0 && (
       <h3 style={{ textAlign: "center" }}>No products available</h3>
       )}
        {products.map((product) => (
          <div key={product._id} style={card}>
            <img
              src={product.image}
              alt={product.title}
              style={image}
            />

            <div style={cardBody}>
              <h3 style={name}>{product.title}</h3>
              <p style={desc}>{product.description}</p>
              <p style={price}>₹{product.price}</p>

              <button
                style={addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const page = {
  padding: "30px",
  backgroundColor: "#f4f6f8",
  minHeight: "100vh",
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const image = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const cardBody = {
  padding: "15px",
};

const name = {
  margin: "0 0 8px",
};

const desc = {
  fontSize: "14px",
  color: "#555",
};

const price = {
  marginTop: "10px",
  fontWeight: "bold",
  color: "#2c3e50",
};

const addToCartBtn = {
  marginTop: "12px",
  width: "100%",
  padding: "10px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Products;
