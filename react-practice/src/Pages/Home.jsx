import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>Shop Smart with E-Kart</h1>
        <p>Your one-stop destination for quality products at best prices.</p>
        <Link to="/products" className="hero-btn">
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          <div className="category-card">Electronics</div>
          <div className="category-card">Accessories</div>
          <div className="category-card">Smart Devices</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features">
        <h2>Why Choose E-Kart?</h2>
        <div className="feature-grid">
          <div>Secure Payments</div>
          <div>Fast Delivery</div>
          <div>Quality Products</div>
          <div>24/7 Support</div>
        </div>
      </section>
    </>
  );
}

export default Home;
