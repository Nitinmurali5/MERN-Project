import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EKartLogo from "../assets/E-Kartlogo.png";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name =
      localStorage.getItem("username") ||
      localStorage.getItem("userEmail");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (token && name) {
      setIsLoggedIn(true);
      setUsername(name);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowProfile(false);
    navigate("/signin");
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={EKartLogo} alt="E-Kart" />
          <span>E-Kart</span>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>

          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="btn">Sign Up</Link>
              <Link to="/signin" className="btn-outline">Sign In</Link>
            </>
          ) : (
            <div className="profile-menu">
              <span
                className="profile-name"
                onClick={() => setShowProfile(true)}
              >
                {username}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      {showProfile && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>User Profile</h3>
            <p>{username}</p>
            <button
              className="popup-btn"
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
